-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Jeu 26 Mars 2015 à 17:43
-- Version du serveur :  5.5.38
-- Version de PHP :  5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `Meetshake`
--

-- --------------------------------------------------------

--
-- Structure de la table `cards`
--

CREATE TABLE `cards` (
`id` int(11) NOT NULL,
  `longitude` float NOT NULL,
  `lattitude` float NOT NULL,
  `description` text COLLATE latin1_general_ci NOT NULL,
  `titre` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `dateheure` datetime NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_groupe` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Contenu de la table `cards`
--

INSERT INTO `cards` (`id`, `longitude`, `lattitude`, `description`, `titre`, `dateheure`, `id_user`, `id_groupe`) VALUES
(1, 48.8967, 2.2567, 'Bla bla bla bla bla bla bla bla bla bla ', 'Chill sur la pelouse du Campus', '2015-03-28 12:30:00', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE `groupe` (
`id` int(11) NOT NULL,
  `titre` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `description` text COLLATE latin1_general_ci NOT NULL,
  `nbpersmax` int(11) NOT NULL,
  `admin` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Contenu de la table `groupe`
--

INSERT INTO `groupe` (`id`, `titre`, `description`, `nbpersmax`, `admin`) VALUES
(1, 'Branleur', 'on se touche quand il fera beau', 20, 0),
(2, 'Branleur', 'Les branleurs reprennent du service', 20, 1);

-- --------------------------------------------------------

--
-- Structure de la table `theme`
--

CREATE TABLE `theme` (
`id` int(11) NOT NULL,
  `libelle` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `image` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `id_cards` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Contenu de la table `theme`
--

INSERT INTO `theme` (`id`, `libelle`, `image`, `id_cards`) VALUES
(1, 'Chill', '', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user_grp`
--

CREATE TABLE `user_grp` (
  `id_user` int(11) NOT NULL,
  `id_grp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
`id` int(20) NOT NULL,
  `login` varchar(32) COLLATE latin1_general_ci NOT NULL,
  `password` varchar(32) COLLATE latin1_general_ci NOT NULL,
  `email` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `lattitude` float NOT NULL,
  `longitude` float NOT NULL,
  `perimetre` float NOT NULL,
  `datebirth` date NOT NULL,
  `sexe` enum('M','S') COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Contenu de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `login`, `password`, `email`, `lattitude`, `longitude`, `perimetre`, `datebirth`, `sexe`) VALUES
(1, 'iabada', 'azerty', 'ibra.abada@gmail.com', 48.8967, 2.2567, 2, '1990-06-08', 'M');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `cards`
--
ALTER TABLE `cards`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id_groupe` (`id_groupe`), ADD KEY `id_theme` (`id_user`), ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `groupe`
--
ALTER TABLE `groupe`
 ADD PRIMARY KEY (`id`), ADD KEY `admin` (`admin`);

--
-- Index pour la table `theme`
--
ALTER TABLE `theme`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id_cards` (`id_cards`);

--
-- Index pour la table `user_grp`
--
ALTER TABLE `user_grp`
 ADD PRIMARY KEY (`id_user`,`id_grp`), ADD KEY `id_grp` (`id_grp`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `cards`
--
ALTER TABLE `cards`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `groupe`
--
ALTER TABLE `groupe`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `theme`
--
ALTER TABLE `theme`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
MODIFY `id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `cards`
--
ALTER TABLE `cards`
ADD CONSTRAINT `cards_ibfk_2` FOREIGN KEY (`id_groupe`) REFERENCES `groupe` (`id`),
ADD CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `theme`
--
ALTER TABLE `theme`
ADD CONSTRAINT `theme_ibfk_1` FOREIGN KEY (`id_cards`) REFERENCES `cards` (`id`);

--
-- Contraintes pour la table `user_grp`
--
ALTER TABLE `user_grp`
ADD CONSTRAINT `user_grp_ibfk_2` FOREIGN KEY (`id_grp`) REFERENCES `groupe` (`id`),
ADD CONSTRAINT `user_grp_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateur` (`id`);
