
--
-- Base de données :  `meetshake`
--

-- --------------------------------------------------------

--
-- Structure de la table `cards`
--

CREATE TABLE IF NOT EXISTS `cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `longitude` float NOT NULL,
  `lattitude` float NOT NULL,
  `description` text COLLATE latin1_general_ci NOT NULL,
  `titre` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `dateheure` datetime NOT NULL,
  `id_theme` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_theme` (`id_theme`,`id_user`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=2 ;

--
-- Contenu de la table `cards`
--

INSERT INTO `cards` (`id`, `longitude`, `lattitude`, `description`, `titre`, `dateheure`, `id_theme`, `id_user`) VALUES
(1, 48.8967, 2.2567, 'Bla bla bla bla bla bla bla bla bla bla ', 'Chill sur la pelouse du Campus', '2015-03-28 12:30:00', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE IF NOT EXISTS `groupe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `desc` text COLLATE latin1_general_ci NOT NULL,
  `nbpersmax` int(11) NOT NULL,
  `admin` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `theme`
--

CREATE TABLE IF NOT EXISTS `theme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `image` varchar(256) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=2 ;

--
-- Contenu de la table `theme`
--

INSERT INTO `theme` (`id`, `libelle`, `image`) VALUES
(1, 'Chill', '');

-- --------------------------------------------------------

--
-- Structure de la table `user_grp`
--

CREATE TABLE IF NOT EXISTS `user_grp` (
  `id_user` int(11) NOT NULL,
  `id_grp` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_grp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` varchar(32) COLLATE latin1_general_ci NOT NULL,
  `password` varchar(32) COLLATE latin1_general_ci NOT NULL,
  `email` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `lattitude` float NOT NULL,
  `longitude` float NOT NULL,
  `perimetre` float NOT NULL,
  `datebirth` date NOT NULL,
  `sexe` enum('M','S') COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=2 ;

--
-- Contenu de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `login`, `password`, `email`, `lattitude`, `longitude`, `perimetre`, `datebirth`, `sexe`) VALUES
(1, 'iabada', 'azerty', 'ibra.abada@gmail.com', 48.8967, 2.2567, 2, '1990-06-08', 'M');


