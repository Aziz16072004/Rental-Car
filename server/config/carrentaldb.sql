-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 10 juin 2025 à 10:30
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `carrentaldb`
--

-- --------------------------------------------------------

--
-- Structure de la table `cars`
--

CREATE TABLE `cars` (
  `VehicleID` int(11) NOT NULL,
  `Model` varchar(100) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `DailyRate` int(11) DEFAULT NULL,
  `addedDate` datetime DEFAULT current_timestamp(),
  `ImageURL` varchar(255) DEFAULT NULL,
  `fuel` varchar(25) DEFAULT NULL,
  `Mark` varchar(50) DEFAULT NULL,
  `doors` varchar(2) DEFAULT NULL,
  `PublicID` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cars`
--

INSERT INTO `cars` (`VehicleID`, `Model`, `Status`, `DailyRate`, `addedDate`, `ImageURL`, `fuel`, `Mark`, `doors`, `PublicID`) VALUES
(11, 'tableau', 'available', 120, '2025-05-26 23:46:41', 'https://res.cloudinary.com/dk4p63fur/image/upload/v1749484089/te7uzul9gyv8jechurbr.jpg', NULL, NULL, NULL, NULL),
(27, 'azaza', 'available', 121, '2025-06-09 16:51:04', 'https://res.cloudinary.com/dk4p63fur/image/upload/v1749484350/wuliqcymzsidwpxw9yx5.jpg', 'Essence', 'bnn', '4', 'uotksmlgaq1t7hfpwb9y');

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `ReservationID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `VehicleID` int(11) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` varchar(10) DEFAULT 'pending',
  `PickupLocation` varchar(255) DEFAULT NULL,
  `DropoffLocation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `savedcar`
--

CREATE TABLE `savedcar` (
  `id` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `VehicleID` int(11) NOT NULL,
  `savedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `CustomerID` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `phoneNumber` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zipCode` int(11) DEFAULT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`CustomerID`, `firstName`, `lastName`, `passwordHash`, `phoneNumber`, `email`, `age`, `city`, `zipCode`, `adresse`, `createdAt`) VALUES
(1, 'John', 'Doe', '$2b$10$XeMnSedVqFnWKZn2tKqnK.eK.UBuO4AWMHhMisCeuQULyiw1R6xXu', '123456789', 'john.doe@example.com', 30, 'Paris', 75000, NULL, '2025-05-29 16:05:16'),
(2, 'aziz', 'chaabani', '$2b$10$Z4HtEkd6JcOgZ4xgPjr07OYhazHF4J6GkVr65VKl3OtHsm4msd.2u', '50551663', 'mouhamedAziz@gmail.com', 20, 'Zahrouni', 2051, '20rue4493 el antit ,zahrouni', '2025-05-29 16:05:16'),
(4, 'Aziz', 'Chaabani', '$2b$10$qosqsdekpauej77RGT2rcuThBA4rfPKJO2ySp8O3c6.3J8mNxh.DC', '50551663', 'mouhamedAzizChaabansdsddi@gmail.com', 12, 'Zahrouni', 2051, '20rue4493 el antit ,zahrouni', '2025-05-29 16:05:16'),
(6, 'aziz', 'chaabani', '$2b$10$4rlp6Q3yLnA5JXDzWT5j9.t2h5Nk7mOEAfpqQImBxCR1.Hmq6zody', '50551663', 'aziz16072004@gmail.com', 21, 'voiiiaaallaaa', 2051, '20rue4493 el antit ,zahrounis', '2025-05-29 16:05:16'),
(7, 'mohamed', 'aziz', '$2b$10$iNC9m2n.DWCMLfb/uuvo2.FoyvnGXLuazG098aYaWwfInSFgDz88y', '50551663', 'aziz160724@gmail.com', 22, 'tunis', 2051, 'zzh5', '2025-05-29 16:06:15');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`VehicleID`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`ReservationID`),
  ADD KEY `CustomerID` (`CustomerID`),
  ADD KEY `reservations_ibfk_2` (`VehicleID`);

--
-- Index pour la table `savedcar`
--
ALTER TABLE `savedcar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CustomerID` (`CustomerID`),
  ADD KEY `savedcar_ibfk_2` (`VehicleID`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`CustomerID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cars`
--
ALTER TABLE `cars`
  MODIFY `VehicleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `ReservationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `savedcar`
--
ALTER TABLE `savedcar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `users` (`CustomerID`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`VehicleID`) REFERENCES `cars` (`VehicleID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `savedcar`
--
ALTER TABLE `savedcar`
  ADD CONSTRAINT `savedcar_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `users` (`CustomerID`),
  ADD CONSTRAINT `savedcar_ibfk_2` FOREIGN KEY (`VehicleID`) REFERENCES `cars` (`VehicleID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
