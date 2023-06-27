from flask_cors import CORS
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask import jsonify, request
from sqlalchemy.orm import class_mapper
from sqlalchemy import desc
import jwt
from flask import request, current_app
import hashlib

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)

CORS(app, resources={r'/*': {'origins': '*'}})


def generar_token(usuario):
    token = jwt.encode({'usuario': usuario}, current_app.config['SECRET_KEY'], algorithm='HS256')
    return token

def verificar_token(token):
    try:
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload['usuario']
    except jwt.ExpiredSignatureError:
        return None

def proteger_ruta(func):
    def wrapped(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return {'message': 'Token no encontrado'}, 401

        # Verificar si el token comienza con "Bearer "
        if token.startswith('Bearer '):
            # Extraer el token real sin la palabra "Bearer"
            token = token.split(' ')[1]

        usuario = verificar_token(token)

        if not usuario:
            return {'message': 'Token inválido o expirado'}, 401

        return func(*args, **kwargs)

    # Cambia el nombre del punto de enlace
    wrapped.__name__ = func.__name__
    return wrapped 

class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String(100))
    password = db.Column(db.String(100))

class Comentarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_noticia = db.Column(db.Integer, db.ForeignKey('noticias.id'))
    comentario = db.Column(db.Text)

    noticia = db.relationship('Noticias', backref=db.backref('comentarios'))

class Categorias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_categoria = db.Column(db.String(100))

class Tipo_noticia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    noticia_tipo = db.Column(db.String(100))

class Noticias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo_noticia = db.Column(db.String(255))
    subtitulo_noticia = db.Column(db.String(255))
    texto_noticia = db.Column(db.Text)
    tags = db.Column(db.String(255))
    categoria_noticia = db.Column(db.Integer, db.ForeignKey('categorias.id'))
    noticia_tipo = db.Column(db.Integer, db.ForeignKey('tipo_noticia.id'))
    url = db.Column(db.Text)

    categoria = db.relationship('Categorias', backref=db.backref('noticias'))
    tipo_noticia = db.relationship('Tipo_noticia', backref=db.backref('noticias'))

class ComentariosRepository:


    def ver_por_noticia(self, id_noticia):
        return Comentarios.query.filter_by(id_noticia=id_noticia).all()

    def ver_todas(self):
        return Comentarios.query.all()
    
    def crear_comentario(self, id_noticia, comentario):
        comentario = Comentarios(id_noticia=id_noticia, comentario=comentario)
        db.session.add(comentario)
        db.session.commit()
        return comentario
    
    def eliminar_comentario(self, id):
        comentario = Comentarios.query.get(id)
        if comentario:
            db.session.delete(comentario)
            db.session.commit()
            return True
        else:
            return False

class CategoriaRepository:

  def ver_todas(self):
        return Categorias.query.all()    

class UsuarioRepository:
  
   def autentificar(self, usuario, password):
        # Buscar el usuario en la base de datos
        usuario = Usuarios.query.filter_by(usuario=usuario).first()

        # Verificar si el usuario existe y si la contraseña es correcta - secur3p4ss
        if usuario and usuario.password == hashlib.md5(password.encode()).hexdigest():

            # Generar el token JWT
            token = generar_token(usuario.usuario)

            # Devolver el token JWT
            return {'token': token}, 200
        else:
            # El usuario no existe o la contraseña es incorrecta
            return {'message': 'Credenciales inválidas'}, 401
        
class Tipo_noticiaRepository:

    def ver_todas(self):
        return Tipo_noticia.query.all()

class NoticiaRepository:

    def ver_todas(self):
        noticias = Noticias.query.order_by(desc(Noticias.id)).all()

        for noticia in noticias:
            if noticia.tags:
                tags = noticia.tags.split(",")  # Separar las palabras por comas
                tags = [tag.strip() for tag in tags]  # Eliminar espacios antes y después de cada palabra
                noticia.tags = tags  # Asignar el array de tags a la propiedad tags de la noticia
        return noticias
    
    def ver_noticia(self, id):
        noticia = Noticias.query.get(id)
        if noticia.tags:
            tags = noticia.tags.split(",")  # Separar las palabras por comas
            tags = [tag.strip() for tag in tags]  # Eliminar espacios antes y después de cada palabra
            noticia.tags = tags  # Asignar el array de tags a la propiedad tags de la noticia
        return noticia

    def crear_noticia(self, titulo, subtitulo, texto, categoria, tipo_noticia, url, tags):
        noticia = Noticias(titulo_noticia=titulo, subtitulo_noticia=subtitulo, texto_noticia=texto,
                          categoria_noticia=categoria, noticia_tipo=tipo_noticia, url=url, tags=tags)
        
        db.session.add(noticia)
        db.session.commit()

        noticias = Noticias.query.all()
        noticias_json = [serialize(noticia) for noticia in noticias]
        return jsonify(noticias_json)

    def actualizar_noticia(self, noticia):
        db.session.commit()
        return noticia

    def eliminar_noticia(self, id):
        comentario = Noticias.query.get(id)
        if comentario:
            db.session.delete(comentario)
            db.session.commit()
            return True  # Comentario eliminado exitosamente
        else:
            return False  # Comentario no encontrado            

    def buscar_noticias(self, terminoBusqueda=None):
        query = Noticias.query

        if terminoBusqueda:
            query = query.filter(
                (Noticias.titulo_noticia.ilike(f"%{terminoBusqueda}%")) |
                (Noticias.subtitulo_noticia.ilike(f"%{terminoBusqueda}%")) |
                (Noticias.texto_noticia.ilike(f"%{terminoBusqueda}%"))
            )

        noticias = query.all()

        # Obtener los nombres de las categorías y los tipos de noticias
        categorias = Categorias.query.all()
        tipos_noticia = Tipo_noticia.query.all()

        # Mapear los ID numéricos a los nombres correspondientes
        categoria_dict = {categoria.id: categoria.nombre_categoria for categoria in categorias}
        tipo_noticia_dict = {tipo_noticia.id: tipo_noticia.noticia_tipo for tipo_noticia in tipos_noticia}

        # Reemplazar los IDs numéricos por los nombres correspondientes en cada noticia
        for noticia in noticias:
            noticia.categoria_noticia = categoria_dict.get(noticia.categoria_noticia)
            noticia.noticia_tipo = tipo_noticia_dict.get(noticia.noticia_tipo)

        return noticias


def serialize(model):
    columns = [c.key for c in class_mapper(model.__class__).columns]
    return {c: getattr(model, c) for c in columns}


@app.route('/')
def index():
    return 'Api 1.0 - Blog MetaGaming'

@app.route('/noticias/', methods=['GET'])
def ver_todas():
    noti_repo = NoticiaRepository()
    noticias = noti_repo.ver_todas()
    noticias_json = [serialize(noticia) for noticia in noticias]
    return jsonify(noticias_json)

@app.route('/noticias/<int:id>', methods=['GET'])
def ver_noticia(id):
    noti_repo = NoticiaRepository()
    noticia = noti_repo.ver_noticia(id)
    if noticia:
        return jsonify(serialize(noticia))
    else:
        return jsonify({'error': 'Noticia no encontrada'}), 404

@app.route('/noticias/buscar', methods=['GET'])
def buscar_noticias():
    noti_repo = NoticiaRepository()
    termino = request.args.get('termino')
    noticias = noti_repo.buscar_noticias(termino)

    noticias_json = [serialize(noticia) for noticia in noticias]
    return jsonify(noticias_json)

@app.route('/noticias/', methods=['POST'])
@proteger_ruta
def crear_noticia():
    noti_repo = NoticiaRepository()
    data = request.get_json()

    titulo = data.get('titulo')
    subtitulo = data.get('subtitulo')
    texto = data.get('texto')
    categoria = data.get('categoria')
    tipo_noticia = data.get('tipo_noticia')
    url = data.get('url')
    tags = data.get('tags')

    return noti_repo.crear_noticia(titulo, subtitulo, texto, categoria, tipo_noticia, url, tags)

@app.route('/noticias/<int:id>', methods=['PUT'])
@proteger_ruta
def actualizar_noticia(id):
    noti_repo = NoticiaRepository()
    noticia = noti_repo.ver_noticia(id)
    if noticia:
        data = request.get_json()

        titulo = data.get('titulo')
        subtitulo = data.get('subtitulo')
        texto = data.get('texto')
        categoria = data.get('categoria')
        url = data.get('url')
        tipo_noticia = data.get('tipo_noticia')
        tags = data.get('tags')

        if titulo:
            noticia.titulo_noticia = titulo
        if subtitulo:
            noticia.subtitulo_noticia = subtitulo
        if texto:
            noticia.texto_noticia = texto
        if categoria:
            noticia.categoria_noticia = categoria
        if url:
            noticia.url = url
        if tipo_noticia:
            noticia.noticia_tipo = tipo_noticia
        if tags:
            noticia.tags = tags

        noti_repo.actualizar_noticia(noticia)
        return jsonify({'mensaje': 'Noticia actualizada exitosamente'})
    else:
        return jsonify({'error': 'Noticia no encontrada'}), 404



@app.route('/noticias/<int:id>', methods=['DELETE'])
@proteger_ruta
def eliminar_noticia(id):
    noti_repo = NoticiaRepository()
    noticia = noti_repo.eliminar_noticia(id)
    if noticia:
        noti_repo.eliminar_noticia(id)
        return jsonify({'mensaje': 'Noticia eliminada exitosamente'})
    else:
        return jsonify({'error': 'Noticia no encontrada'}), 404


@app.route('/api/login', methods=['POST'])
def autentificar():
    login = UsuarioRepository()

    data = request.get_json()
    if data and 'usuario' in data and 'password' in data:
        usuario = data.get('usuario')
        password = data.get('password')
        return login.autentificar(usuario, password)
    else:
        return jsonify({'error': 'Datos JSON incompletos'}), 400

@app.route('/categorias/', methods=['GET'])
def ver_categorias():
    categorias_repo = CategoriaRepository()
    tipo_noticia_repo = Tipo_noticiaRepository()
    categorias = categorias_repo.ver_todas()
    tipo_noticias = tipo_noticia_repo.ver_todas()
    
    categorias_json = [serialize(categoria) for categoria in categorias]
    tipo_noticias_json = [serialize(tipo_noticia) for tipo_noticia in tipo_noticias]
    
    return jsonify({
        'categorias_valores': categorias_json,
        'tipo_noticia_valores': tipo_noticias_json
    })

@app.route('/comentarios/', methods=['GET'])
def ver_todas_comentarios():
    comentarios_repo = ComentariosRepository()
    comentarios = comentarios_repo.ver_todas()
    comentarios_json = [serialize(comentario) for comentario in comentarios]
    return jsonify(comentarios_json)

@app.route('/comentarios/<int:id_noticia>', methods=['GET'])
def ver_comentarios_por_noticia(id_noticia):
    comentarios_repo = ComentariosRepository()
    comentarios = comentarios_repo.ver_por_noticia(id_noticia)
    comentarios_json = [serialize(comentario) for comentario in comentarios]
    return jsonify(comentarios_json)

@app.route('/comentarios/', methods=['POST'])
def crear_comentario():
    comentarios_repo = ComentariosRepository()
    data = request.get_json()

    id_noticia = data.get('id_noticia')
    comentario = data.get('comentario')
    comentario_creado = comentarios_repo.crear_comentario(id_noticia, comentario)

    if comentario_creado:
        return jsonify({'mensaje': 'Comentario creado exitosamente'}), 200
    else:
        return jsonify({'mensaje': 'No se pudo crear el comentario'}), 500

@app.route('/comentarios/<int:id>', methods=['DELETE'])
@proteger_ruta
def eliminar_comentario(id):

    comentarios_repo = ComentariosRepository()
    comentario = comentarios_repo.eliminar_comentario(id)
    if comentario:
        comentarios_repo.eliminar_comentario(id)
        return jsonify({'mensaje': 'Comentario eliminado exitosamente'})
    else:
        return jsonify({'error': 'Comentario no encontrada'}), 404

if __name__ == '__main__':
    app.run()