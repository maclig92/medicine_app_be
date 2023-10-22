-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 18 Paź 2023, 22:06
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `medicine-app`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `medicine`
--

CREATE TABLE `medicine` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `form` varchar(10) NOT NULL,
  `numberOfDailyDoses` tinyint(2) UNSIGNED NOT NULL DEFAULT 0,
  `doseUnit` varchar(10) NOT NULL,
  `doseQuantity` decimal(6,3) UNSIGNED NOT NULL DEFAULT 0.000,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `note` varchar(1000) DEFAULT NULL,
  `ownerId` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `medicine`
--

INSERT INTO `medicine` (`id`, `name`, `form`, `numberOfDailyDoses`, `doseUnit`, `doseQuantity`, `startDate`, `endDate`, `note`, `ownerId`) VALUES
('C3K0S921ny', 'Augmentin', 'tabletki', 2, 'tabletka', '1.000', '2023-10-09', '2023-10-15', 'antybiotyk, co 12 godzin', 'e5rjIxBXr0'),
('hfyijQbFEk', 'Atoris', 'tabletki', 1, 'tabletka', '1.000', NULL, NULL, 'wieczorem', 'e5rjIxBXr0'),
('I5RXfk6SMJ', 'Vessel Due F', 'kapsułki', 2, 'wziew', '1.000', '2023-10-01', '0000-00-00', 'na żyły', 'e5rjIxBXr0'),
('pKxoWapjR_', 'Fostex', 'aerozol in', 2, 'wziew', '2.000', '0000-00-00', '0000-00-00', '', 'e5rjIxBXr0'),
('QlUsgqmh-Z', 'Letrox 50', 'tabletki', 1, 'tabletka', '1.000', NULL, NULL, 'na czczo', 'e5rjIxBXr0'),
('UuU9AG-FTQ', 'Acard', 'tabletki', 1, 'tabl', '1.000', '0000-00-00', '0000-00-00', '', 'e5rjIxBXr0'),
('v1qv6UlWjm', 'Bisocard', 'tabletki', 1, 'tabletka', '1.000', '2023-09-26', '2023-09-29', 'na serce', 'e5rjIxBXr0'),
('XWqmzXJpO4', 'Fostex', 'aerozol', 2, 'wziew', '2.000', '2023-09-01', '2024-04-25', '', 'e5rjIxBXr0');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `medicine_prescription`
--

CREATE TABLE `medicine_prescription` (
  `id` int(11) NOT NULL,
  `prescriptionId` varchar(10) DEFAULT '0',
  `medicineId` varchar(10) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `medicine_prescription`
--

INSERT INTO `medicine_prescription` (`id`, `prescriptionId`, `medicineId`) VALUES
(1, NULL, 'C3K0S921ny'),
(2, 't35T0wEiD1', NULL),
(3, 't35T0wEiD1', NULL),
(4, 'qWeRtY9292', 'hfyijQbFEk'),
(8, '123asd123w', 'I5RXfk6SMJ'),
(9, 't9D5rvf8a4', NULL),
(10, 't9D5rvf8a4', NULL),
(11, NULL, 'C3K0S921ny'),
(12, '0hQXy_wA1_', NULL),
(13, '0hQXy_wA1_', NULL),
(14, '0hQXy_wA1_', 'UuU9AG-FTQ'),
(15, '0hQXy_wA1_', 'v1qv6UlWjm'),
(16, '0hQXy_wA1_', 'hfyijQbFEk'),
(17, '7k3P0yCRls', 'UuU9AG-FTQ'),
(18, '7k3P0yCRls', 'C3K0S921ny'),
(19, 'DiuEGIINzF', 'pKxoWapjR_'),
(20, 'bBjli-ZVfZ', 'I5RXfk6SMJ');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `prescription`
--

CREATE TABLE `prescription` (
  `id` varchar(10) NOT NULL,
  `prescriptionNumber` smallint(4) UNSIGNED NOT NULL,
  `issueDate` date DEFAULT NULL,
  `isYearly` tinyint(1) NOT NULL DEFAULT 0,
  `isAntibiotic` tinyint(1) NOT NULL DEFAULT 0,
  `ownerId` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `prescription`
--

INSERT INTO `prescription` (`id`, `prescriptionNumber`, `issueDate`, `isYearly`, `isAntibiotic`, `ownerId`) VALUES
('0hQXy_wA1_', 1001, '2023-10-02', 0, 0, 'e5rjIxBXr0'),
('123asd123w', 4365, '2023-09-30', 1, 0, 'e5rjIxBXr0'),
('7k3P0yCRls', 1001, '2023-01-02', 0, 1, 'e5rjIxBXr0'),
('bBjli-ZVfZ', 9999, '2023-10-03', 1, 0, 'e5rjIxBXr0'),
('DiuEGIINzF', 6547, '2023-12-01', 0, 1, 'e5rjIxBXr0'),
('djSkvkv2jd', 9205, '2023-10-01', 0, 0, 'e5rjIxBXr0'),
('qWeRtY9292', 2233, '2023-09-15', 0, 0, 'e5rjIxBXr0'),
('StYBNh3dXd', 5673, '2023-09-25', 0, 0, 'e5rjIxBXr0'),
('t35T0wEiD1', 4985, '2023-08-12', 1, 0, 'e5rjIxBXr0'),
('t9D5rvf8a4', 9999, '2023-10-03', 1, 0, 'e5rjIxBXr0'),
('Wv0rawc2J8', 4598, '2023-12-01', 1, 0, 'e5rjIxBXr0'),
('wWs23Sa98z', 2313, '2023-10-02', 1, 0, 'e5rjIxBXr0'),
('Zzwr4hZJdD', 9999, '2023-10-03', 1, 0, 'e5rjIxBXr0');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` varchar(10) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(40) NOT NULL,
  `PESELnumber` int(11) UNSIGNED DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `PESELnumber`, `password`, `createdAt`, `updatedAt`) VALUES
('e5rjIxBXr0', 'test', 'test@example.com', NULL, '$2b$10$A.6qzPuacn4YVlLTj3yire3vD0wojZ/Kz9rVVmzkm35KC0pOeoKAi', '2023-10-03 18:02:38', '2023-10-03 18:02:38'),

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ownerId` (`ownerId`);

--
-- Indeksy dla tabeli `medicine_prescription`
--
ALTER TABLE `medicine_prescription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Indeks 2` (`prescriptionId`),
  ADD KEY `Indeks 3` (`medicineId`);

--
-- Indeksy dla tabeli `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `ownerId` (`ownerId`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `PESELnumber` (`PESELnumber`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `medicine_prescription`
--
ALTER TABLE `medicine_prescription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `medicine`
--
ALTER TABLE `medicine`
  ADD CONSTRAINT `FK_medicine_user` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `medicine_prescription`
--
ALTER TABLE `medicine_prescription`
  ADD CONSTRAINT `FK_medicine_prescription_medicine` FOREIGN KEY (`medicineId`) REFERENCES `medicine` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `FK_medicine_prescription_prescription` FOREIGN KEY (`prescriptionId`) REFERENCES `prescription` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Ograniczenia dla tabeli `prescription`
--
ALTER TABLE `prescription`
  ADD CONSTRAINT `FK_prescription_user` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
