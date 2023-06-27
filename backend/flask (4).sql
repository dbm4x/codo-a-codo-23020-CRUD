-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-06-2023 a las 21:55:17
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `flask`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre_categoria` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre_categoria`) VALUES
(1, 'PC'),
(2, 'RETRO'),
(3, 'DESTACADOS'),
(4, 'PS5'),
(5, 'XSERIES');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `id_noticia` int(11) DEFAULT NULL,
  `comentario` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `id_noticia`, `comentario`) VALUES
(1, 19, 'hola como va'),
(17, 19, 'Buena noticia'),
(18, 19, 'Me gusta más xbox');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `id` int(11) NOT NULL,
  `titulo_noticia` varchar(255) DEFAULT NULL,
  `subtitulo_noticia` varchar(255) DEFAULT NULL,
  `texto_noticia` text DEFAULT NULL,
  `categoria_noticia` int(11) DEFAULT NULL,
  `noticia_tipo` int(11) DEFAULT NULL,
  `url` text DEFAULT NULL,
  `tags` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`id`, `titulo_noticia`, `subtitulo_noticia`, `texto_noticia`, `categoria_noticia`, `noticia_tipo`, `url`, `tags`) VALUES
(3, '¿Qué es Only Up!? El último fenómeno que está arrasando en Steam y Twitch con sus mecánicas de parkour', 'Será mejor que no sufráis de vértigo y tengáis unos nervios de acero, porque los vais a necesitar.', '<p>Con algunos videojuegos nos hemos encontrado casos en los que originalmente su popularidad era pr&aacute;cticamente nula, pero en cuanto algunos streamers muy conocidos se pon&iacute;an a jugarlos esta se disparaba considerablemente. En ese sentido, uno de los casos m&aacute;s llamativos fue el que se produjo hace tiempo con Among Us, que durante sus dos primeros a&ntilde;os, desde 2018, &uacute;nicamente sab&iacute;an de su existencia las familias de los desarrolladores y poco m&aacute;s.</p>\n', 3, 2, 'https://i.blogs.es/51445a/only-up/1366_2000.webp', NULL),
(4, 'PlayStation Store arranca una nueva promoción repleta de ofertas: aquí tienes nueve juegazos que no te puedes perder para PS4 y PS5', 'Una tanda de descuentos a la que se ha sumado Bandai Namco con decenas de sus títulos.', '<p><span style=\"color:#2ecc71;\"><u><em><span style=\"font-size:48px;\"><span style=\"background-color:#e74c3c;\">blabla</span></span></em></u></span></p>\n\n<p style=\"margin-left: 120px;\"><span style=\"color:#2ecc71;\"><u><em><span style=\"font-size:48px;\"><span style=\"background-color:#e74c3c;\"><img alt=\"\" src=\"https://i.blogs.es/660a35/tales-of-arise/500_333.jpeg\" style=\"width: 300px; height: 200px;\" /></span></span></em></u></span></p>\n', 4, 2, 'https://i.blogs.es/660a35/tales-of-arise/500_333.jpeg', NULL),
(12, 'dssd', 'dsds', '', 3, 3, 'https://i0.wp.com/lavidaesunvideojuego.com/wp-content/uploads/2023/06/CRYMACHINA-occidente-fecha-lavidaesunvideojuego.jpg?w=1920&ssl=1', NULL),
(13, 'dssdd', 'dsds', '', 3, 3, 'https://i0.wp.com/lavidaesunvideojuego.com/wp-content/uploads/2023/06/DiegoBrandoJojosAllStarsBattleRPortada-LaVidaesunVIdeojuego.jpg?w=1200&ssl=1', NULL),
(17, 'El nuevo Final Fantasy exclusivo para PS5 se ha convertido en una experiencia totalmente inolvidable.', 'Revive la nostalgia de los ordenadores de 8 bits y descubre las increíbles actividades que realizábamos en los años 80.', '<p><s><strong><span style=\"background-color:#f1c40f;\">Los que nacimos a mediados o finales</span></strong></s></p>\n\n<h1><span style=\"color:#2ecc71;\"><span style=\"font-family:Comic Sans MS,cursive;\">fddsdss<em>dsd</em></span></span></h1>\n\n<blockquote>\n<p><em>de los setenta tuvimos la suerte</em> de poder disfrutar de los primeros ordenadores de 8 bits con la mirada del ni&ntilde;o que se flipa con cualquier cosa, del chaval que con nueve o diez a&ntilde;os tiene acceso a unas m&aacute;quinas que no acaba de entender pero que le abren las puertas a un nuevo universo capaz de ofrecerle horas y horas de diversi&oacute;n.</p>\n</blockquote>\n\n<p><img alt=\"fdf\" src=\"https://i.blogs.es/155293/1182580/1920_733.jpeg\" style=\"width: 200px; height: 76px;\" />&nbsp;</p>\n', 2, 1, 'https://i.blogs.es/155293/1182580/1920_733.jpeg', 'only up, ps4, experiencia'),
(19, 'PlayStation Store arranca una nueva promoción repleta de ofertas: aquí tienes nueve juegazos que no te puedes perder para PS4 y PS5', 'Una tanda de descuentos a la que se ha sumado Bandai Namco con decenas de sus títulos.', '<p>blabla</p>\n', 4, 2, 'https://i0.wp.com/lavidaesunvideojuego.com/wp-content/uploads/2023/06/CRYMACHINA-occidente-fecha-lavidaesunvideojuego.jpg?w=1920&ssl=1', NULL),
(33, 'Soedesco revela un nuevo juego de  Truck Driver', 'SOEDESCO ha revelado el desarrollo de la última entrega de la franquicia en un nuevo tráiler. Truck Driver: The American Dream ...', '<p>hhh</p>\n', 1, 3, 'https://puregaming.es/wp-content/uploads/2023/06/Truck-Driver-1-560x370.jpg', NULL),
(34, 'NEED FOR SPEED UNBOUND Volume 3, Ya disponible', 'EA y Criterion Games han lanzado Need for Speed: Unbound Volume 3, el segundo de una serie de actualizaciones posteriores al lanzamiento, que presenta nuevas carreras, listas de juego, eventos, desafíos diarios y semanales para ganar XP, además de cosméti', '<p>fddf</p>\n', 1, 3, 'https://puregaming.es/wp-content/uploads/2023/06/Need-for-Speed-Unbound-1-560x370.jpg', NULL),
(35, 'PLAYSTATION STORE ofertas de mitad de año', 'Sony Interactive Entertainment (SIE) anuncia la llegada de nuevas ofertas en títulos para PlayStation®4 (PS4®) y PlayStation®5 (PS5®) a PlayStation™Store a través de las campañas promocionales: ‘Ofertas de Mitad de Año’ y ‘Bandai Namco’. Ambas estarán dis', '<p>rrere</p>\n', 4, 3, 'https://puregaming.es/wp-content/uploads/2023/06/PlayStation-Store-1-560x370.jpg', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_noticia`
--

CREATE TABLE `tipo_noticia` (
  `id` int(11) NOT NULL,
  `noticia_tipo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_noticia`
--

INSERT INTO `tipo_noticia` (`id`, `noticia_tipo`) VALUES
(1, 'Titular'),
(2, 'Destacados'),
(3, 'Generales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'juanjo', '21232f297a57a5a743894a0e4a801fc3');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_noticia` (`id_noticia`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_noticia` (`categoria_noticia`),
  ADD KEY `noticia_tipo` (`noticia_tipo`);

--
-- Indices de la tabla `tipo_noticia`
--
ALTER TABLE `tipo_noticia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `tipo_noticia`
--
ALTER TABLE `tipo_noticia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_noticia`) REFERENCES `noticias` (`id`);

--
-- Filtros para la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD CONSTRAINT `noticias_ibfk_1` FOREIGN KEY (`categoria_noticia`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `noticias_ibfk_2` FOREIGN KEY (`noticia_tipo`) REFERENCES `tipo_noticia` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
