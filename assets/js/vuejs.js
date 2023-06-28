const emitter = mitt()
const url_api = 'https://dbm4x.pythonanywhere.com'

const HeaderComponent = {
  template: `
  <header class="cabecera">
  <div class="menuSuperior">
    <div class="slogan">
      <router-link to="/">
        <h3 class="stexto">#MetaGaming</h3>
      </router-link>
    </div>

    <div class="derecha">
      <ul>
        <li class="fb"><a href="#" target="_blank"><i class="fa fa-facebook"></i></a></li>
        <li class="twitter"><a href="#" target="_blank"><i class="fa fa-twitter"></i></a></li>
        <li class="instagram"><a href="#" target="_blank"><i class="fa fa-instagram"></i></a></li>
        <li class="youtube"><a href="#" target="_blank"><i class="fa fa-youtube"></i></a></li>
        <li class="rss"><a href="#" target="_blank"><i class="fa fa-rss"></i></a></li>
      </ul>

      <button @click="verLogin" class="button" v-if="!verificarToken()">Iniciar sesión</button>
      <button @click="salir" class="button" v-if="verificarToken()">Logout</button>
    </div>
  </div>

  <div class="logo">
    <img src="assets/img/logo.jpeg" />
  </div>
  


  <div class="menu">
    
      <div v-if="isMobile">
        <button class="menu-toggle" @click="toggleMenu">
        <i class="fa fa-2x fa-bars"></i> <b>Menu</b>
        </button>
      </div>
      <div class="buscador">
          <input class="busqueda" type="text" placeholder="Veamos si esta ..." v-model="terminoBusqueda" required/>
          <button @click="buscarTermino" class="bobuscar"><i class="fa fa-search fa-lg"></i></button>
      </div>
   

    <div class="menui">
      <ul class="menu-items" :class="{ active: isMenuOpen }">
        <li class="item" @click="closeMenu"><router-link to="/" class="link-no-decoration">HOME</router-link></li>
        <li class="item" @click="closeMenu"><router-link to="/pc" class="link-no-decoration">PC</router-link></li>
        <li class="item" @click="closeMenu"><router-link to="/retro" class="link-no-decoration">RETRO</router-link></li>
        <li class="item" @click="closeMenu"><router-link to="/destacados" class="link-no-decoration">DESTACADOS</router-link></li>
        <li class="item" @click="closeMenu"><router-link to="/ps5" class="link-no-decoration">PS5</router-link></li>
        <li class="item" @click="closeMenu"><router-link to="/xseries" class="link-no-decoration">XSERIES</router-link></li>
      </ul>
    </div>
  </div>
</header>

  `,
  data() {
    return {
      logueado: false,
      isMenuOpen: false,
      isMobile: false,
      terminoBusqueda: ''
    };
  },
  methods: {
    buscarTermino() {
      // Obtener el término de búsqueda
   
      const busqueda = this.terminoBusqueda.trim();
  
      if (busqueda !== '') {
        // Navegar a la ruta de resultados de búsqueda, pasando el término de búsqueda como parámetro
        this.$router.push({ path: '/busqueda', query: { q: busqueda } });
        this.terminoBusqueda = ''
      }
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768; // Establece el ancho máximo para considerar como dispositivo móvil
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    verLogin() {
      vm.mostrarFormularioLogin();
    },
    iniciarSesion() {
      this.logueado = true;
    },
    salir() {
      localStorage.removeItem('token');
      this.logueado = false; // Actualizar el estado de logueado a false
      emitter.emit('foo', false)
    },
    verificarToken() {
      const token = localStorage.getItem('token');
      this.logueado = token !== null;
      return this.logueado;
    }
  },
  created() {
    this.verificarToken(); // Verificar el token al cargar el componente
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  destroyed() {
    window.removeEventListener('resize', this.checkMobile);
  },
  watch: {
    logueado(newValue) {
      // El watcher observa cambios en la variable "logueado"
      // No es necesario hacer nada en este caso
    }
  }
};

const FooterComponent = {
  template: `
  <footer class="fot">
  <div class="enlaces">
      <div class="quienes-somos">
          <h2>Quiénes <span>somos?</span></h2>
          <p>

              ¡Bienvenidos a <b>MetaGaming</b>!, la plataforma de comunicación especializada en videojuegos,
              hardware y eventos!

              Nuestro equipo está compuesto por expertos apasionados por los videojuegos y el hardware, quienes se
              dedican a generar contenido original y de calidad.
              Únete a nuestra comunidad y descubre un mundo lleno de pasión por los videojuegos, donde encontrarás
              todo lo que necesitas para mantener tu espíritu gamer en constante crecimiento. ¡Nos vemos en
              MetaGaming!
          </p>
      </div>
      <div class="enlaces-rapidos">
          <h2>Enlaces <span>rápidos</span></h2>
          <ul>
          <li><router-link to="/" class="link-no-decoration">HOME</router-link></li>
          <li><router-link to="/pc" class="link-no-decoration">PC</router-link></li>
          <li><router-link to="/retro" class="link-no-decoration">RETRO</router-link></li>
          <li><router-link to="/destacados" class="link-no-decoration">DESTACADOS</router-link></li>
          <li><router-link to="/ps5" class="link-no-decoration">PS5</router-link></li>
          <li><router-link to="/xseries" class="link-no-decoration">XSERIES</router-link></li>
          </ul>
      </div>
      <div>
      <div class="contacto">
          <h2>Contacto</h2>
          <form>

              <label for="fname">Nombre</label>
              <input type="text" name="nombre" placeholder="Nombre y apellido">

              <label for="lname">E-mail</label>
              <input type="text" name="email" placeholder="Correo electrónico">

              <label for="asunto">Asunto</label>

              <textarea id="asunto" name="asunto" rows="2"
                  placeholder="¡Hola!, me contacto con ustedes ..."></textarea>

              <button type="submit">Enviar</button>

          </form>
      </div>
      </div>

  </div>

  <div class="copyright">
      <p>&#169; 2023 MetaGaming - Todos los derechos reservados</p>
  </div>
</footer>
  `,
};

const MainComponent = {
  template: `
  <main>
  <article class="articulo-destacado">
    <div :class="{ 'adm': claseAdmActiva }">
      <p class="zona" v-if="claseAdmActiva">Zona de administración</p>
      <p class="zona2" v-if="claseAdmActiva">Sección titulares</p>
      <button class="agregar-button" v-if="claseAdmActiva" @click="nuevaNoticia"><i class="fa fa-plus" aria-hidden="true"></i> Agregar Noticia</button>
      <div v-for="noticia in titularesNoticias" :key="noticia.id">
      <div class="contenedor">
      <nav class="admin-nav" v-if="claseAdmActiva">
        <button class="editar-button" @click="updateNoticia(noticia.id)"><i class="fa fa-pencil" aria-hidden="true"></i> Editar noticia</button>
        <button class="eliminar-button" @click="showPopupEliminar(noticia.id)"><i class="fa fa-times" aria-hidden="true"></i> Eliminar</button>
      </nav>
      <picture>
        <img :src="noticia.url">
      </picture>
      <header class="articulodheader">
        <div class="titulo">
        <router-link :to="{ name: 'LeerNoticia', params: { id: noticia.id } }">
        <h2>{{noticia.titulo_noticia}}</h2>
         </router-link>
        </div>
        <div class="subtexto">
          <p>{{noticia.subtitulo_noticia}}</p>
        </div>
      </header>
        </div>
        <div class="tag-post">
  <i class="fa fa-tag" aria-hidden="true"></i> <span>Tags: </span>
  <template v-for="(tag, index) in noticia.tags" :key="index">
    <router-link :to="{ path: '/busqueda', query: { q: tag } }">{{ tag }}</router-link>
    <span v-if="index < noticia.tags.length - 1"><span class="text-black">, </span> </span>
  </template>
</div>

      </div>
    </div>
  </article>

  <div class="articulo-lista" :class="{ 'adm': claseAdmActiva }">
  <p class="zona" v-if="claseAdmActiva">Zona de administración</p>
  <p class="zona2" v-if="claseAdmActiva">Sección destacados</p>
  <button class="agregar-button" v-if="claseAdmActiva" @click="nuevaNoticia"><i class="fa fa-plus" aria-hidden="true"></i> Agregar Noticia</button>
  <article class="post" v-for="noticia in destaNoticias" :key="noticia.id">
  <nav class="admin-nav" v-if="claseAdmActiva">
          <button class="editar-button" @click="updateNoticia(noticia.id)"><i class="fa fa-pencil" aria-hidden="true"></i> Editar noticia</button>
          <button class="eliminar-button" @click="showPopupEliminar(noticia.id)"><i class="fa fa-times" aria-hidden="true"></i> Eliminar</button>
  </nav>
  <div class="tag" :class="obtenerClaseCategoria(obtenerNombreCategoria(noticia.categoria_noticia))">
  {{obtenerNombreCategoria(noticia.categoria_noticia)}}
  </div>
  <div class="poster-figure">
  <router-link :to="{ name: 'LeerNoticia', params: { id: noticia.id } }">
      <img :src="noticia.url">
  </router-link>
  </div>
  <header class="poster-content">
    <h2 class="poster-title">
    <router-link :to="{ name: 'LeerNoticia', params: { id: noticia.id } }">

      {{noticia.titulo_noticia}}
      </router-link>
    </h2>
  </header>
</article>
</div>
  <div class="generales">
    <div class="noticias">
      
    <div class="titulo">
    Más publicaciones
 </div>
      
      <div :class="{ 'adm': claseAdmActiva, 'gm': claseAdmActiva}">
      <p class="zona" v-if="claseAdmActiva">Zona de administración</p>
      <p class="zona2" v-if="claseAdmActiva">Sección generales</p>
      <button class="agregar-button" v-if="claseAdmActiva" @click="nuevaNoticia"><i class="fa fa-plus" aria-hidden="true"></i> Agregar Noticia</button>

      <div class="columna-noticia">
      <div class="cardg" v-for="noticia in generalesNoticias" :key="noticia.id">
      
        <div class="card-content">
        <nav class="admin-nav" v-if="claseAdmActiva">
            <button class="editar-button" @click="updateNoticia(noticia.id)"><i class="fa fa-pencil" aria-hidden="true"></i> Editar noticia</button>
            <button class="eliminar-button" @click="showPopupEliminar(noticia.id)"><i class="fa fa-times" aria-hidden="true"></i> Eliminar</button>
        </nav>
          <div class="row">
            <div class="col-md-12">
              <div class="tag2" :class="obtenerClaseCategoria(obtenerNombreCategoria(noticia.categoria_noticia))">{{ obtenerNombreCategoria(noticia.categoria_noticia) }}</div>
          </div>
          
            <div class="col-md-4 mb-3">
              <img :src="noticia.url" class="img-fluid img-thumbnail">
            </div>
            <div class="col-md-8">
              <div class="card-text">
                <h2 class="card-title">{{ noticia.titulo_noticia }}</h2>
                <p class="card-description">{{ noticia.subtitulo_noticia }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <button class="read-more" @click="leerNoticia(noticia.id)">Leer más ...</button>
          </div>
        </div>
      </div>
    </div>    
    </div>    
    


    </div>
    <div class="sidebar">
      <div class="espacio">
        <p class="titulo-sidebar">LO MÁS POPULAR</p>
        <ol>
          <li class="item-box">
        <a href="#">
          <span class="ordinal">1</span>
          <div class="content">Análisis de Final Fantasy XVI. Uno de los juegos más apoteósicos de la actual generación de consolas y todo un espectáculo audiovisual</div>
        </a>
        </li>
        <li class="item-box">
        <a href="#">
       <span class="ordinal">2</span>
      <div class="content">"Es una decisión creativa, no un problema de Xbox": el universo de Starfield solo alcanzará los 30FPS en consolas </div>
       </a>
      </li>
       <li class="item-box">
       <a href="#">
      <span class="ordinal">3</span>
      <div class="content">"Necesitas tenerlo en PlayStation": crean una petición para que Starfield sea exclusivo de PS5 y la respuesta ha sido unánime </div>
     </a>
      </li>
       <li class="item-box">
       <a href="#">
      <span class="ordinal">4</span>
      <div class="content">Así jugábamos en los 80 con los ordenadores de 8 bits: haciendo cosas que no creerías</div>
     </a>
      </li>
       <li class="item-box">
       <a href="#">
      <span class="ordinal">5</span>
      <div class="content">"Queremos modernizar el trabajo de Tolkien": Magic busca inclusión y diversidad en la colaboración con El Señor de los Anillos </div>
     </a>
      </li>
     </ol>

     
     <section class="wrapper">
      <div class="content">
       <header>
         <h1>Suscribirse</h1>
       </header>
       <section>
         <p>
           Suscríbete y mantente al tanto de las noticias y novedades.
         </p>
       </section>
       <footer>
         <input type="email" placeholder="Ingrese su correo">
         <button>Suscribirse</button>
       </footer>
      </div>
      </section>



    </div>
    </div>
    </div>
  <div class="overlayAgregarNoticia" v-show="agregarNoticia">

            <div class="popupAgregarNoticia">
                <div class="centro">
                    <h2>Agregar noticia</h2>
                    <a class="close" @click="cerrarAgregar">&times;</a>
                </div>
                <div class="content">
                    <form class="formulario-login">
                    <label for="titulo">Titulo noticia</label>
                    <input name="titulo" type="text" placeholder="Titulo" v-model="titulo" required>
                    <label for="subtitulo">Subtitulo noticia</label>
                    <input name="subtitulo" type="text" placeholder="Subtitulo" v-model="subtitulo" required>
                    <label for="categoria">Categoría de noticia</label>

                    <select name="categoria" id="categoria" v-model="categoria" required>
                    <option v-for="categoria in categorias_valores" :value="categoria.id" :selected="categoria.nombre_categoria === categoria">
                      {{ categoria.nombre_categoria }}
                    </option>
                    </select>
                    <label for="tipoNoticia">Tipo de noticia</label>

<select name="tipoNoticia" id="tipoNoticia" v-model="tipoNoticia" required>
  <option disabled selected>Seleccionar tipo de noticia</option>
  <option v-for="tipo in tipo_noticia_valores" :value="tipo.id" :selected="tipo.noticia_tipo === tipoNoticia">{{ tipo.noticia_tipo }}</option>
</select>

                    
                    <label for="texto">Texto noticia</label>
                    <textarea name="texto" ref="editor" v-model="texto" required></textarea>


                    <label class="labelUrl" for="tags">Tags (Separado por comas)</label>
                    <input name="tags" type="text" placeholder="videojuegos, ..." v-model="tags" required>

                    <label class="labelUrl" for="url">Url imágen</label>
                    <input name="url" type="text" placeholder="https://www..." v-model="url" required>

                    <button type="button" @click="validateAndAddNoticia(false)">Agregar noticia</button>
                    </form>
                </div>
            </div>
          </div>
            <div class="popupCancel" v-show="eliminarCartel"> 
            <div class="popup-content">
              <h2>Confirmación</h2>
              <p>¿Estás seguro de eliminar esta noticia?</p>
              <div class="buttons">
                <button @click="eliminarNoticia(itemId)" class="confirm-button">
                  <i class="fa fa-check"></i> Eliminar
                </button>
                <button @click="cancelDelete" class="cancel-button">
                  <i class="fa fa-times"></i> Cancelar
                </button>
              </div>
            </div>
        </div>

        <div class="overlayAgregarNoticia" v-show="actualizarNoticia">

            <div class="popupAgregarNoticia">
                <div class="centro">
                    <h2>Actualizar noticia</h2>
                    <a class="close" @click="cerrarActualizar">&times;</a>
                </div>
                <div class="content">
                    <form class="formulario-login">
                    <label for="titulo">Titulo noticia</label>
                    <input name="titulo" type="text" placeholder="Titulo" v-model="titulo" required>
                    <label for="subtitulo">Subtitulo noticia</label>
                    <input name="subtitulo" type="text" placeholder="Subtitulo" v-model="subtitulo" required>
                    <label for="categoria">Categoría de noticia</label>

                    <select name="categoria" id="categoria" v-model="categoria" required>
                    <option v-for="categoria in categorias_valores" :value="categoria.id" :selected="categoria.nombre_categoria === categoria">
                      {{ categoria.nombre_categoria }}
                    </option>
                    </select>
                    <label for="tipoNoticia">Tipo de noticia</label>
                    <select name="tipoNoticia" id="tipoNoticia" v-model="tipoNoticia" required>
                    <option disabled selected>Seleccionar tipo de noticia</option>
                    <option v-for="tipo in tipo_noticia_valores" :value="tipo.id" :selected="tipo.noticia_tipo === tipoNoticia">{{ tipo.noticia_tipo }}</option>
                  </select>
                  
                    
                    <label for="texto">Texto noticia</label>
                    <textarea name="texto" ref="editor2" v-model="texto" required></textarea>

                    <label class="labelUrl" for="tags">Tags (Separado por comas)</label>
                    <input name="tags" type="text" placeholder="videojuegos, ..." v-model="tags" required>

                    <label class="labelUrl" for="url">Url imágen</label>
                    <input name="url" type="text" placeholder="https://www..." v-model="url" required>

                    <button type="button" @click="validateAndAddNoticia(true)">Actualizar noticia</button>
                    </form>
                </div>
            </div>
          </div>
            <div class="popupCancel" v-show="eliminarCartel"> 
            <div class="popup-content">
              <h2>Confirmación</h2>
              <p>¿Estás seguro de eliminar esta noticia?</p>
              <div class="buttons">
                <button @click="eliminarNoticia(itemId)" class="confirm-button">
                  <i class="fa fa-check"></i> Eliminar
                </button>
                <button @click="cancelDelete" class="cancel-button">
                  <i class="fa fa-times"></i> Cancelar
                </button>
              </div>
            </div>
        </div>

        <div class="success-message" v-if="success">
        <i class="fa fa-check-circle"></i>
        <span>¡Éxito! Cambios realizados correctamente.</span>
    </div>

    <div class="error-message" v-if="error">
        <i class="fa fa-exclamation-circle"></i>
        <span>¡Error! Ha ocurrido un problema. Intente nuevamente.</span>
    </div>




     </div>
     <div class="loader" v-if="isLoading">
     <div class="centrar">
       <div class="pacman">
         <span class="top"></span>
         <span class="bottom"></span>
         <span class="left"></span>
         <div class="eye"></div>
       </div>
       <div class="circles">
         <span class="one"></span>
         <span class="two"></span>
         <span class="three"></span>
       </div>
     </div>
   </div>
</main>
  `,
  data() {
    return {
      noticias: [],
      claseAdmActiva: false,
      success: false,
      error: false,
      agregarNoticia: false,
      success: false,
      error: false,
      titulo: '',
      subitulo: '',
      categoria: '',
      tipoNoticia: '',
      texto: '',
      url: '',
      eliminarCartel: false,
      itemId: null,
      idActualizar: null,
      editor: null,
      editor2: null,
      actualizarNoticia: false,
      categorias_valores: [],
      tipo_noticia_valores: [],
      tags: [],
      isLoading: true
    };
  },
  created() {
    emitter.on('foo', this.onFoo);
  },
  mounted() {
    this.verificarToken();
    this.fetchNoticias();
    this.fetchCategorias();
    this.editor = CKEDITOR.replace(this.$refs.editor, {
      height: 150,
      language: 'es',
      toolbar: [
        { name: 'document', items: ['Source', '-', 'Save'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
        { name: 'styles', items: ['Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'insert', items: ['Image'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks'],
       }
      ],
      allowedContent: true // Agregar esta opción
    });
    
    this.editor.on('change', () => {
      this.texto = this.editor.getData();
    });
    
    this.$watch('texto', (newValue) => {
      if (this.editor && this.editor.getData() !== newValue) {
        this.editor.setData(newValue);
      }
    });
    
    this.editor2 = CKEDITOR.replace(this.$refs.editor2, {
      height: 150,
      language: 'es',
      toolbar: [
        { name: 'document', items: ['Source', '-', 'Save'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
        { name: 'styles', items: ['Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'insert', items: ['Image'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
      ],
      allowedContent: true // Agregar esta opción
    });
    
    this.editor2.on('change', () => {
      this.texto = this.editor2.getData();
    });
    
    this.$watch('texto', (newValue) => {
      if (this.editor2 && this.editor2.getData() !== newValue) {
        this.editor2.setData(newValue);
      }
    });

  },
  computed: {
    generalesNoticias() {
      return this.noticias.filter(noticia => this.obtenerNombreTipoNoticia(noticia.noticia_tipo) == "Generales");
    },
    titularesNoticias() {
      return this.noticias.filter(noticia => this.obtenerNombreTipoNoticia(noticia.noticia_tipo) === "Titular");
    },
    destaNoticias() {
      return this.noticias.filter(noticia => this.obtenerNombreTipoNoticia(noticia.noticia_tipo) === "Destacados");
    }
  },
  methods: {

    leerNoticia(id) {
      this.$router.push({ name: 'LeerNoticia', params: { id: id } });
    },

    obtenerClaseCategoria(nombreCategoria) {

      if (nombreCategoria === 'RETRO') {
        return 'categoria-retro';
      } else if (nombreCategoria === 'PS5') {
        return 'categoria-ps5';
      } else if (nombreCategoria === 'DESTACADOS') {
        return 'categoria-destacados';
      } else if (nombreCategoria === 'XSERIES') {
        return 'categoria-xseries';
      } else if (nombreCategoria === 'PC') {
        return 'categoria-pc';
      } else {
        return '';
      }

    },
    obtenerNombreCategoria(id) {
      const categoria = this.categorias_valores.find(c => c.id === id);
      return categoria ? categoria.nombre_categoria : '';
    },

    obtenerNombreTipoNoticia(id) {
      const tipoNoticia = this.tipo_noticia_valores.find(c => c.id === id);
      return tipoNoticia ? tipoNoticia.noticia_tipo : '';
    },

    verificarToken() {
      const token = localStorage.getItem('token');
      this.claseAdmActiva = token !== null;
      return this.claseAdmActiva;
    },
    onFoo(payload) {
      this.claseAdmActiva = payload
   
      // Realiza las acciones necesarias con el payload recibido
    },
    updateNoticia(id) {

      const noticia = this.noticias.find(n => n.id === id);
  
      if (noticia) {
        // Completar los campos del formulario con los datos de la noticia
        this.titulo = noticia.titulo_noticia;
        this.subtitulo = noticia.subtitulo_noticia;
        this.categoria = noticia.categoria_noticia;
        this.tipoNoticia = noticia.noticia_tipo;
        this.texto = noticia.texto_noticia;
        this.url = noticia.url;
        this.tags = noticia.tags ? noticia.tags.join(", ") : '';
        // Almacenar el ID de la noticia que se está actualizando
        this.idActualizar = id;
        this.actualiza()
      }
    },
    showPopupEliminar(id) {
      this.itemId = id
      this.eliminarCartel = true
    },
    cancelDelete() {
      this.eliminarCartel = false
    },
    validateAndAddNoticia(chequear) {
    const inputs = document.querySelectorAll('.formulario-login input[required]');
    const selects = document.querySelectorAll('.formulario-login select[required]');
    const textarea = document.querySelector('.formulario-login textarea[required]');

    let allFieldsValid = true;

    // Verificar campos de entrada (input)
    inputs.forEach(input => {
      if (!input.validity.valid) {
        allFieldsValid = false;
        input.reportValidity();
      }
    });

    // Verificar campos de selección (select)
    selects.forEach(select => {
      if (!select.validity.valid) {
        allFieldsValid = false;
        select.reportValidity();
      }
    });

    if (allFieldsValid) {
      if(chequear) {
      this.actualizando();
      } else {
        this.addNoticia();
      }
    }
  },
  resetear() {
    this.titulo = '',
    this.subtitulo = '',
    this.categoria = '',
    this.tipoNoticia = '',
    this.texto = '',
    this.url = '',
    this.itemId = null
    this.idActualizar = null
    this.tags = []
  },
  fetchCategorias() {
    axios.get(url_api+'/categorias/')
  .then(response => {
    this.categorias_valores = response.data.categorias_valores;
    this.tipo_noticia_valores = response.data.tipo_noticia_valores;
    // otras asignaciones de datos si es necesario
  })
  .catch(error => {
    console.error('Error al obtener las noticias:', error);
  });
  },

    fetchNoticias() {

    axios.get(url_api+'/noticias/', {
      //headers: {
      //  Authorization: `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
      //},
    })
        .then(response => {
          this.noticias = response.data;
          this.isLoading = false
        })
        .catch(error => {
          console.error('Error al obtener las noticias:', error);
          this.isLoading = false
        });
    },
    eliminarNoticia(id) {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
const headers = {
  Authorization: `Bearer ${token}` // Agregar el token al encabezado de la solicitud
};

axios.delete(url_api+'/noticias/'+id, { headers })
  .then(response => {
    // Procesar la respuesta del servidor
    this.fetchNoticias();
    this.fetchCategorias();
    this.success = true; // Mostrar el éxito
    this.eliminarCartel = false;
    this.resetear()
    setTimeout(() => {
      this.success = false; // Cambiar el valor a false después de 2 segundos
      this.agregarNoticia = false;
    }, 3000);
  })
  .catch(error => {
    this.error = true; // Mostrar el error
    this.eliminarCartel = false;
    setTimeout(() => {
      this.error = false; // Cambiar el valor a false después de 2 segundos
    }, 3000);
    console.error(error);
  });
    },

    addNoticia() {

      const token = localStorage.getItem('token'); // Obtener el token del localStorage
    

      const formData = {
        titulo: this.titulo,
        subtitulo: this.subtitulo,
        categoria: this.categoria,
        texto: this.texto,
        tipo_noticia: this.tipoNoticia,
        url: this.url,
        tags: this.tags.split(",").map(tag => tag.trim()).join(", ")
      };
    

      const headers = {
        Authorization: `Bearer ${token}` // Agregar el token al encabezado de la solicitud
      };
    

      axios.post(url_api+'/noticias/', formData, { headers })
      .then(response => {

        this.fetchNoticias();
          this.success = true;
          this.resetear();
          this.agregarNoticia = false

        setTimeout(() => {
          this.success = false; // Cambiar el valor a false después de 2 segundos
        }, 3000);

      })
      .catch(error => {
        this.error = true; // Mostrar el error

      setTimeout(() => {
        this.error = false; // Cambiar el valor a false después de 2 segundos
      }, 3000);
        console.error(error);
      });

    },
    actualizando() {

   
      const token = localStorage.getItem('token');

      const formData = {
        titulo: this.titulo,
        subtitulo: this.subtitulo,
        categoria: this.categoria,
        texto: this.texto,
        tipo_noticia: this.tipoNoticia,
        url: this.url,
        tags: this.tags.length ? this.tags.split(",").map(tag => tag.trim()).join(", ") : ''
      };
      
      const headers = {
        Authorization: `Bearer ${token}`
      };
      
      axios.put(url_api+'/noticias/'+this.idActualizar, formData, { headers })
        .then(response => {
          this.fetchNoticias();
          this.success = true;
          this.resetear();
      
          this.actualizarNoticia = false;
          
          setTimeout(() => {
            this.success = false;
          }, 3000);
        })
        .catch(error => {
          this.error = true;
      
          setTimeout(() => {
            this.error = false;
          }, 3000);
      
          console.error(error);
        });

    },
    nuevaNoticia() {
      this.agregarNoticia = true
      this.resetear()
    },
    actualiza() {
      this.actualizarNoticia = true
    },
    cerrarAgregar() {
      this.agregarNoticia = false
    },
    cerrarActualizar() {
      this.actualizarNoticia = false
    }
  },
  beforeUnmount() {
    emitter.off('foo', this.onFoo);
  },
  watch: {
    claseAdmActiva(newValue) {
      // El watcher observa cambios en la variable "logueado"
      // No es necesario hacer nada en este caso
    }
  }

};

const PCComponent = {
  template: `
  <section class="mt-2 mb-2 p-4">
  <div class="row">
  <div class="col-10 mx-auto" v-if="pcNoticias.length === 0">
  <div class="alert alert-info text-center">
    No hay noticias disponibles en esta sección.
  </div>
</div>
    <div class="col-12 col-md-4 mb-4" v-for="noticia in pcNoticias" :key="noticia.id">
      <article class="card rounded">
      <router-link :to="{ name: 'LeerNoticia', params: { id: noticia.id } }">
        <div class="img-card">
          <img :src="noticia.url">
        </div>
        <div class="card-content">
          <div class="card-title">
              {{noticia.titulo_noticia}}
          </div>
          <p class="card-text">
            {{noticia.subtitulo_noticia}}
          </p>
        </div>
      </router-link>  
      </article>  
      <div v-if="index == 0">
      fdfd
      </div>
    </div>
  </div>
</section>
<div class="loader" v-if="isLoading">
  <div class="centrar">
    <div class="pacman">
      <span class="top"></span>
      <span class="bottom"></span>
      <span class="left"></span>
      <div class="eye"></div>
    </div>
    <div class="circles">
      <span class="one"></span>
      <span class="two"></span>
      <span class="three"></span>
    </div>
  </div>
</div>
  `,
  data() {
    return {
      noticias: [],
      categorias_valores: [],
      tipo_noticia_valores: [],
      isLoading: true
    }
  },
  methods: {
    fetchCategorias() {
      axios.get(url_api+'/categorias/')
    .then(response => {
      this.categorias_valores = response.data.categorias_valores;
      this.tipo_noticia_valores = response.data.tipo_noticia_valores;
      // otras asignaciones de datos si es necesario
    })
    .catch(error => {
      console.error('Error al obtener las noticias:', error);
    });
  },
    obtenerNombreCategoria(id) {
      const categoria = this.categorias_valores.find(c => c.id === id);
      return categoria ? categoria.nombre_categoria : '';
    },

    fetchNoticias() {

      axios.get(url_api+'/noticias/', {
        //headers: {
        //  Authorization: `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        //},
      }).then(response => {
            this.noticias = response.data;
            this.isLoading = false
      }).catch(error => {
            console.error('Error al obtener las noticias:', error);
            this.isLoading = false
      });

    }
  },
  mounted() {
    this.fetchCategorias();
    this.fetchNoticias();
  },
  computed: {
    pcNoticias() {
  
      return this.noticias.filter(noticia => this.obtenerNombreCategoria(noticia.categoria_noticia) === "PC");
    }
  }
};

const DestacadosComponent = {
  template: `
  <section class="mt-2 mb-2 p-4">
  <div class="row">
  <div class="col-10 mx-auto" v-if="destacadosNoticias.length === 0">
  <div class="alert alert-info text-center">
    No hay noticias disponibles en esta sección.
  </div>
</div>
    <div class="col-12 col-md-4 mb-4" v-for="noticia in destacadosNoticias" :key="noticia.id">
      <article class="card rounded">
      <router-link :to="{ name: 'LeerNoticia', params: { id: noticia.id } }">
        <div class="img-card">
          <img :src="noticia.url">
        </div>
        <div class="card-content">
          <div class="card-title">
              {{noticia.titulo_noticia}}
          </div>
          <p class="card-text">
            {{noticia.subtitulo_noticia}}
          </p>
        </div>
      </router-link>  
      </article>  
      <div v-if="index == 0">
      fdfd
      </div>
    </div>
  </div>
</section>
<div class="loader" v-if="isLoading">
  <div class="centrar">
    <div class="pacman">
      <span class="top"></span>
      <span class="bottom"></span>
      <span class="left"></span>
      <div class="eye"></div>
    </div>
    <div class="circles">
      <span class="one"></span>
      <span class="two"></span>
      <span class="three"></span>
    </div>
  </div>
</div>
  `,
  data() {
    return {
      noticias: [],
      categorias_valores: [],
      tipo_noticia_valores: [],
      isLoading: true
    }
  },
  methods: {
    fetchCategorias() {
      axios.get(url_api+'/categorias/')
    .then(response => {
      this.categorias_valores = response.data.categorias_valores;
      this.tipo_noticia_valores = response.data.tipo_noticia_valores;
      // otras asignaciones de datos si es necesario
    })
    .catch(error => {
      console.error('Error al obtener las noticias:', error);
    });
  },
    obtenerNombreCategoria(id) {
      const categoria = this.categorias_valores.find(c => c.id === id);
      return categoria ? categoria.nombre_categoria : '';
    },

    fetchNoticias() {

      axios.get(url_api+'/noticias/', {
        //headers: {
        //  Authorization: `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        //},
      }).then(response => {
            this.noticias = response.data;
            this.isLoading = false
      }).catch(error => {
            console.error('Error al obtener las noticias:', error);
            this.isLoading = false
      });

    }
  },
  mounted() {
    this.fetchCategorias();
    this.fetchNoticias();
  },
  computed: {
    destacadosNoticias() {
  
      return this.noticias.filter(noticia => this.obtenerNombreCategoria(noticia.categoria_noticia) === "DESTACADOS");
    }
  }
};

const RetroComponent = {
  template: `
  <section class="mt-2 mb-2 p-4">
  <div class="row">
  <div class="col-10 mx-auto" v-if="retroNoticias.length === 0">
  <div class="alert alert-info text-center">
    No hay noticias disponibles en esta sección.
  </div>
</div>
    <div class="col-12 col-md-4 mb-4" v-for="noticia in retroNoticias" :key="noticia.id">
      <article class="card rounded">
      <router-link :to="{ name: 'LeerNoticia', params: { id: noticia.id } }">
        <div class="img-card">
          <img :src="noticia.url">
        </div>
        <div class="card-content">
          <div class="card-title">
              {{noticia.titulo_noticia}}
          </div>
          <p class="card-text">
            {{noticia.subtitulo_noticia}}
          </p>
        </div>
      </router-link>  
      </article>  
      <div v-if="index == 0">
      fdfd
      </div>
    </div>
  </div>
</section>
<div class="loader" v-if="isLoading">
  <div class="centrar">
    <div class="pacman">
      <span class="top"></span>
      <span class="bottom"></span>
      <span class="left"></span>
      <div class="eye"></div>
    </div>
    <div class="circles">
      <span class="one"></span>
      <span class="two"></span>
      <span class="three"></span>
    </div>
  </div>
</div>
  `,
  data() {
    return {
      noticias: [],
      categorias_valores: [],
      tipo_noticia_valores: [],
      isLoading: false
    }
  },
  methods: {
    fetchCategorias() {
      axios.get(url_api+'/categorias/')
    .then(response => {
      this.categorias_valores = response.data.categorias_valores;
      this.tipo_noticia_valores = response.data.tipo_noticia_valores;
      // otras asignaciones de datos si es necesario
    })
    .catch(error => {
      console.error('Error al obtener las noticias:', error);
    });
  },
    obtenerNombreCategoria(id) {
      const categoria = this.categorias_valores.find(c => c.id === id);
      return categoria ? categoria.nombre_categoria : '';
    },

    fetchNoticias() {

      axios.get(url_api+'/noticias/', {
        //headers: {
        //  Authorization: `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        //},
      }).then(response => {
            this.noticias = response.data;
            this.isLoading = false
      }).catch(error => {
            console.error('Error al obtener las noticias:', error);
            this.isLoading = false
      });

    }
  },
  mounted() {
    this.fetchCategorias();
    this.fetchNoticias();
  },
  computed: {
    retroNoticias() {
     
      return this.noticias.filter(noticia => this.obtenerNombreCategoria(noticia.categoria_noticia) === "RETRO");
    }
  }
};

const PS5Component = {
  template: `
  <section class="mt-2 mb-2 p-4">
  <div class="row">
  <div class="col-10 mx-auto" v-if="ps5Noticias.length === 0">
  <div class="alert alert-info text-center">
    No hay noticias disponibles en esta sección.
  </div>
</div>
    <div class="col-12 col-md-4 mb-4" v-for="noticia in ps5Noticias" :key="noticia.id">
      <article class="card rounded">
      <router-link :to="{ name: 'LeerNoticia', params: { id: noticia.id } }">
        <div class="img-card">
          <img :src="noticia.url">
        </div>
        <div class="card-content">
          <div class="card-title">
              {{noticia.titulo_noticia}}
          </div>
          <p class="card-text">
            {{noticia.subtitulo_noticia}}
          </p>
        </div>
      </router-link>  
      </article>  
      <div v-if="index == 0">
      fdfd
      </div>
    </div>
  </div>
</section>
<div class="loader" v-if="isLoading">
  <div class="centrar">
    <div class="pacman">
      <span class="top"></span>
      <span class="bottom"></span>
      <span class="left"></span>
      <div class="eye"></div>
    </div>
    <div class="circles">
      <span class="one"></span>
      <span class="two"></span>
      <span class="three"></span>
    </div>
  </div>
</div>
  `,
  data() {
    return {
      noticias: [],
      categorias_valores: [],
      tipo_noticia_valores: [],
      isLoading: true
    }
  },
  methods: {
    fetchCategorias() {
      axios.get(url_api+'/categorias/')
    .then(response => {
      this.categorias_valores = response.data.categorias_valores;
      this.tipo_noticia_valores = response.data.tipo_noticia_valores;
      // otras asignaciones de datos si es necesario
    })
    .catch(error => {
      console.error('Error al obtener las noticias:', error);
    });
  },
    obtenerNombreCategoria(id) {
      const categoria = this.categorias_valores.find(c => c.id === id);
      return categoria ? categoria.nombre_categoria : '';
    },

    fetchNoticias() {

      axios.get(url_api+'/noticias/', {
        //headers: {
        //  Authorization: `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        //},
      }).then(response => {
            this.noticias = response.data;
            this.isLoading = false
      }).catch(error => {
            console.error('Error al obtener las noticias:', error);
            this.isLoading = false
      });

    }
  },
  mounted() {
    this.fetchCategorias();
    this.fetchNoticias();
  },
  computed: {
    ps5Noticias() {
      return this.noticias.filter(noticia => this.obtenerNombreCategoria(noticia.categoria_noticia) === "PS5");
    }

  }
};

const XseriesComponent = {
  template: `
  <section class="mt-2 mb-2 p-4">
  <div class="row">
  <div class="col-10 mx-auto" v-if="xseriesNoticias.length === 0">
  <div class="alert alert-info text-center">
    No hay noticias disponibles en esta sección.
  </div>
</div>
    <div class="col-12 col-md-4 mb-4" v-for="noticia in xseriesNoticias" :key="noticia.id">
      <article class="card rounded">
      <router-link :to="{ name: 'LeerNoticia', params: { id: noticia.id } }">
        <div class="img-card">
          <img :src="noticia.url">
        </div>
        <div class="card-content">
          <div class="card-title">
              {{noticia.titulo_noticia}}
          </div>
          <p class="card-text">
            {{noticia.subtitulo_noticia}}
          </p>
        </div>
      </router-link>  
      </article>  
      <div v-if="index == 0">
      fdfd
      </div>
    </div>
  </div>
</section>
<div class="loader" v-if="isLoading">
<div class="centrar">
  <div class="pacman">
    <span class="top"></span>
    <span class="bottom"></span>
    <span class="left"></span>
    <div class="eye"></div>
  </div>
  <div class="circles">
    <span class="one"></span>
    <span class="two"></span>
    <span class="three"></span>
  </div>
</div>
</div>
  `,
  data() {
    return {
      noticias: [],
      categorias_valores: [],
      tipo_noticia_valores: [],
      isLoading: true
    }
  },
  methods: {
    fetchCategorias() {
      axios.get(url_api+'/categorias/')
    .then(response => {
      this.categorias_valores = response.data.categorias_valores;
      this.tipo_noticia_valores = response.data.tipo_noticia_valores;
      // otras asignaciones de datos si es necesario
    })
    .catch(error => {
      console.error('Error al obtener las noticias:', error);
    });
  },
    obtenerNombreCategoria(id) {
      const categoria = this.categorias_valores.find(c => c.id === id);
      return categoria ? categoria.nombre_categoria : '';
    },

    fetchNoticias() {

      axios.get(url_api+'/noticias/', {
        //headers: {
        //  Authorization: `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        //},
      }).then(response => {
            this.noticias = response.data;
            this.isLoading = false
      }).catch(error => {
            console.error('Error al obtener las noticias:', error);
            this.isLoading = false
      });

    }
  },
  mounted() {
    this.fetchCategorias();
    this.fetchNoticias();
  },
  computed: {
    xseriesNoticias() {
      return this.noticias.filter(noticia => this.obtenerNombreCategoria(noticia.categoria_noticia) === "XSERIES");
    }
  }
};


const LeerNoticiaComponent = {
  template: `
  <div class="leerNoticiaContenedor">
  
  
  <div class="generales">
  <div class="noticias">
    <div class="titulo">
    <router-link to="/">#MetaGaming</router-link> > <router-link :to="obtenerRutaCategoria(obtenerNombreCategoria(noticias.categoria_noticia))">{{obtenerNombreCategoria(noticias.categoria_noticia)}}</router-link> 
    </div>
    <div class="container news-container mt-5">
    <div class="row">
      <div class="col-12">
        <h1 class="news-title">{{noticias.titulo_noticia}}</h1>
        <h4 class="news-subtitle">{{noticias.subtitulo_noticia}}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
      <img :src="noticias.url" class="img-fluid news-image">
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="news-content">
        <div v-html="noticias.texto_noticia" class="noticia-texto"></div>
        </p>
      </div>
    </div>
    
    <div class="row mt-5">
    <div class="col-12">
      <p class="news-tags">
        <i class="fa fa-tag"></i><span>Tags: </span>
        <template v-for="(tag, index) in noticias.tags" :key="index">
        <router-link :to="{ path: '/busqueda', query: { q: tag } }">{{ tag }}</router-link>
          <span v-if="index < noticias.tags.length - 1">, </span>
        </template>
      </p>
    </div>
  </div>


<hr>

<h4 class="mb-4">Comentarios ({{comentarios.length}}):</h4>

<div class="comment-wrapper" v-for="(comentario, index) in comentarios" :key="index">
  <div class="row mb-3">
    <div class="col-auto">
      <img :src="'assets/img/' + imagenes[index % imagenes.length]" class="img-fluid avatar-image img-thumbnail" style="width: 65px; height: 50px">
    </div>
    <div class="col">
      <div class="row">
        <div class="col-12">
          <p class="comment-text">{{comentario.comentario}}</p>
        </div>
      </div>
    </div>
    <div class="col-auto" v-if="claseAdmActiva">
      <button class="btn btn-link btn" @click="eliminarComentario(comentario.id)">
        <i class="fa fa-trash"></i>
      </button>
    </div>
  </div>
</div>

<div class="row mt-4">
  <div class="col-10">
    <textarea class="form-control" rows="3" v-model="comentario"></textarea>
  </div>
</div>
<div class="row mt-3">
  <div class="col-12">
    <button class="btn btn-primary" @click="enviarComentario">Enviar comentario</button>
  </div>
</div>







    
  </div>
  </div>
  <div class="sidebar">
    <div class="espacio">
      <p class="titulo-sidebar">LO MÁS POPULAR</p>
      <ol>
      <li class="item-box">
        <a href="#">
        <span class="ordinal">1</span>
        <div class="content">Análisis de Final Fantasy XVI. Uno de los juegos más apoteósicos de la actual generación de consolas y todo un espectáculo audiovisual</div>
      </a>
      </li>
      <li class="item-box">
      <a href="#">
     <span class="ordinal">2</span>
    <div class="content">"Es una decisión creativa, no un problema de Xbox": el universo de Starfield solo alcanzará los 30FPS en consolas </div>
     </a>
    </li>
     <li class="item-box">
     <a href="#">
    <span class="ordinal">3</span>
    <div class="content">"Necesitas tenerlo en PlayStation": crean una petición para que Starfield sea exclusivo de PS5 y la respuesta ha sido unánime </div>
   </a>
    </li>
     <li class="item-box">
     <a href="#">
    <span class="ordinal">4</span>
    <div class="content">Así jugábamos en los 80 con los ordenadores de 8 bits: haciendo cosas que no creerías</div>
   </a>
    </li>
     <li class="item-box">
     <a href="#">
    <span class="ordinal">5</span>
    <div class="content">"Queremos modernizar el trabajo de Tolkien": Magic busca inclusión y diversidad en la colaboración con El Señor de los Anillos </div>
   </a>
    </li>
   </ol>

   
   <section class="wrapper">
      <div class="content">
       <header>
         <h1>Suscribirse</h1>
       </header>
       <section>
         <p>
           Suscríbete y mantente al tanto de las noticias y novedades.
         </p>
       </section>
       <footer>
         <input type="email" placeholder="Ingrese su correo">
         <button>Suscribirse</button>
       </footer>
      </div>
      </section>



  </div>
  </div>
  </div>

  
  </div>
  <div class="success-message" v-if="success">
        <i class="fa fa-check-circle"></i>
        <span>¡Éxito! Cambios realizados correctamente.</span>
    </div>

    <div class="error-message" v-if="error">
        <i class="fa fa-exclamation-circle"></i>
        <span>¡Error! Ha ocurrido un problema. Intente nuevamente.</span>
    </div>
    <div class="loader" v-if="isLoading">
  <div class="centrar">
    <div class="pacman">
      <span class="top"></span>
      <span class="bottom"></span>
      <span class="left"></span>
      <div class="eye"></div>
    </div>
    <div class="circles">
      <span class="one"></span>
      <span class="two"></span>
      <span class="three"></span>
    </div>
  </div>
</div>
  `,
  data() {
    return {
      noticias: [],
      categorias_valores: [],
      tipo_noticia_valores: [],
      imagenes: [
        "imagen1.jpg",
        "imagen2.jpg",
        "imagen3.jpg",
        "imagen4.jpg",
        "imagen5.jpg",
      ],
      comentarios: [],
      comentario: '',
      success: false,
      error: false,
      claseAdmActiva: false,
      isLoading: true
    }
  },
  created() {
    emitter.on('foo', this.onFoo);
  },
  methods: {
      obtenerRutaCategoria(categoria) {
        switch (categoria) {
          case "PC":
            return '/pc';
          case "RETRO":
            return '/retro';
          case "DESTACADOS":
            return '/destacados';
          case "PS5":
            return '/ps5';
          case "XSERIES":
            return '/xseries';
          default:
            return '/';
        }
    },

    verificarToken() {
      const token = localStorage.getItem('token');
      this.claseAdmActiva = token !== null;
      return this.claseAdmActiva;
    },
    eliminarComentario(id) {

      const token = localStorage.getItem('token'); // Obtener el token del localStorage
      const headers = {
        Authorization: `Bearer ${token}` // Agregar el token al encabezado de la solicitud
      };
      
      axios.delete(url_api+'/comentarios/'+id, { headers })
        .then(response => {
          this.fetchComentarios();
          this.success = true; // Mostrar el éxito
          setTimeout(() => {
            this.success = false; // Cambiar el valor a false después de 2 segundos
          }, 3000);
        })
        .catch(error => {
          this.error = true; // Mostrar el error
          setTimeout(() => {
            this.error = false; // Cambiar el valor a false después de 2 segundos
          }, 3000);
        });
    },
    enviarComentario() {

      const formData = {
        comentario: this.comentario,
        id_noticia: this.$route.params.id
      };
      
      axios.post(url_api+'/comentarios/', formData)
        .then(response => {
          this.fetchComentarios();
          this.comentario = ''
        })
        .catch(error => {
          this.error = true;
      
          setTimeout(() => {
            this.error = false;
          }, 3000);
      
        });
        
    },
    onFoo(payload) {
      this.claseAdmActiva = payload
     
      // Realiza las acciones necesarias con el payload recibido
    },
    fetchCategorias() {
      axios.get(url_api+'/categorias/')
    .then(response => {
      this.categorias_valores = response.data.categorias_valores;
      this.tipo_noticia_valores = response.data.tipo_noticia_valores;
      // otras asignaciones de datos si es necesario
    })
    .catch(error => {
      console.error('Error al obtener las noticias:', error);
    });
  },
    obtenerNombreCategoria(id) {
      const categoria = this.categorias_valores.find(c => c.id === id);
      return categoria ? categoria.nombre_categoria : '';
    },

    fetchNoticias() {

      axios.get(url_api+'/noticias/'+this.$route.params.id, {
        //headers: {
        //  Authorization: `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        //},
      }).then(response => {
            this.noticias = response.data;
            this.isLoading = false
      }).catch(error => {
            console.error('Error al obtener las noticias:', error);
      });

    },
    fetchComentarios() {

      axios.get(url_api+'/comentarios/'+this.$route.params.id, {
        //headers: {
        //  Authorization: `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        //},
      }).then(response => {
            this.comentarios = response.data;
      }).catch(error => {
            console.error('Error al obtener las noticias:', error);
      });

    }
  },
  mounted() {
    this.fetchCategorias();
    this.fetchNoticias();
    this.fetchComentarios();
    this.verificarToken();
  },
  computed: {
    seleccionarImagen() {
      return function (index) {
        const imagenIndex = index % this.imagenes.length;
        return this.imagenes[imagenIndex];
      };
    },
  },
  beforeUnmount() {
    emitter.off('foo', this.onFoo);
  },
  watch: {
    claseAdmActiva(newValue) {
      // El watcher observa cambios en la variable "logueado"
      // No es necesario hacer nada en este caso
    }
  }
};

const BusquedaComponent = {
  template: `
  <section class="mt-2 mb-2 p-4">
  <div class="row">
    <div class="col-12 mb-4" v-if="noticias.length != 0">
    <h4 class="text-center text-white bg-primary font-weight-bold p-2">Resultados para la búsqueda: <strong>{{$route.query.q}}</strong></h4>
    </div>
    <div class="col-10 mx-auto" v-if="noticias.length === 0">
      <div class="alert alert-info text-center">
        <b>No se encontraron resultados de búsqueda.</b>
      </div>
    </div>
    <div class="col-12 col-md-4 mb-4" v-for="noticia in noticias" :key="noticia.id">
      <article class="card rounded">
        <router-link :to="{ name: 'LeerNoticia', params: { id: noticia.id } }">
          <div class="img-card">
            <img :src="noticia.url">
          </div>
          <div class="card-content">
            <div class="card-title">
              {{noticia.titulo_noticia}}
            </div>
            <p class="card-text">
              {{noticia.subtitulo_noticia}}
            </p>
          </div>
        </router-link>  
      </article>  
      <div v-if="index == 0">
        fdfd
      </div>
    </div>
  </div>
</section>
<div class="loader" v-if="isLoading">
  <div class="centrar">
    <div class="pacman">
      <span class="top"></span>
      <span class="bottom"></span>
      <span class="left"></span>
      <div class="eye"></div>
    </div>
    <div class="circles">
      <span class="one"></span>
      <span class="two"></span>
      <span class="three"></span>
    </div>
  </div>
</div>
  `,
  data() {
    return {
      noticias: [],
      isLoading: true
    }
  },
  methods: {

    fetchNoticias() {

      const url = url_api + '/noticias/buscar?termino=' + this.$route.query.q;



      axios.get(url, {
        //headers: {
        //  Authorization: `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        //},
      }).then(response => {
            this.noticias = response.data;
            this.isLoading = false;
      }).catch(error => {
            console.error('Error al obtener las noticias:', error);
            this.isLoading = false;
      });

    }
},
watch: {
  '$route'(to, from) {
    // Verificar si el parámetro de búsqueda ha cambiado
    if (to.query.q !== from.query.q) {
      this.fetchNoticias();
    }
  }
},

mounted() {
  this.fetchNoticias();
}

}



const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: '/', component: MainComponent,beforeEnter(to, from, next) {
      window.scrollTo(0, 0); // Realiza el desplazamiento hacia la parte superior
      next();
    } },
    { path: '/pc', component: PCComponent,beforeEnter(to, from, next) {
      window.scrollTo(0, 300); // Realiza el desplazamiento hacia la parte superior
      next();
    }},
    { path: '/destacados', component: DestacadosComponent,beforeEnter(to, from, next) {
      window.scrollTo(0, 300); // Realiza el desplazamiento hacia la parte superior
      next();
    }},
    { path: '/retro', component: RetroComponent,beforeEnter(to, from, next) {
      window.scrollTo(0, 300); // Realiza el desplazamiento hacia la parte superior
      next();
    }},
    { path: '/ps5', component: PS5Component,beforeEnter(to, from, next) {
      window.scrollTo(0, 300); // Realiza el desplazamiento hacia la parte superior
      next();
    }},
    { path: '/xseries', component: XseriesComponent,beforeEnter(to, from, next) {
      window.scrollTo(0, 300); // Realiza el desplazamiento hacia la parte superior
      next();
    }},
    { path: '/noticias/:id', name: 'LeerNoticia', component: LeerNoticiaComponent,beforeEnter(to, from, next) {
      window.scrollTo(0, 300); // Realiza el desplazamiento hacia la parte superior
      next();
    }},
    { path: '/busqueda', component: BusquedaComponent,beforeEnter(to, from, next) {
      window.scrollTo(0, 300); // Realiza el desplazamiento hacia la parte superior
      next();
    }},
  ]
});

const app = Vue.createApp({
  data() {
    return {
      mostrarFormulario: false,
      usuario: '',
      password: '',
      mostrarError: false,
      logueado: true,
    };
  },
  methods: {
    async iniciarSesion() {
      this.mostrarError = false;
      try {
        // Realizar la solicitud HTTP a la API
        const response = await axios.post(url_api+'/api/login', {
          usuario: this.usuario,
          password: this.password
        });
    
        // Verificar la respuesta de la API
        if (response.data && response.data.token) {
          const token = response.data.token;
          // Guardar el token en el almacenamiento local o en una variable de Vue.js
          // para su uso posterior
          // Ejemplo:
          localStorage.setItem('token', token);
          // O si deseas almacenarlo en una variable de Vue.js
          // this.token = token;
          this.mostrarError = false;
          this.mostrarFormulario = false;

          const headerComponentInstance = this.$refs.headerComponent;
          headerComponentInstance.iniciarSesion();

          emitter.emit('foo', true)


        } else {
          // Las credenciales son incorrectas, mostrar un mensaje de error
          this.mostrarError = true;
        }
      } catch (error) {
        // Ocurrió un error al realizar la solicitud HTTP
        this.mostrarError = true;
        console.error(error);
      }
    },
    
    mostrarFormularioLogin() {
      this.mostrarFormulario = !this.mostrarFormulario;
    }
  }
});

app.component('header-component', HeaderComponent);
app.component('footer-component', FooterComponent);

app.use(router);
const vm = app.mount('#app');
