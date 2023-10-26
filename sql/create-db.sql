-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 26 Paź 2023, 13:01
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

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
('96VoUZ7zGI', 'DicloDuo Combi', 'kapsułki', 2, 'kapsułka', '1.000', '0000-00-00', '0000-00-00', '', 'TVP8eMlrGx'),
('C3K0S921ny', 'Augmentin', 'tabletki', 2, 'tabletka', '1.000', '2023-10-09', '2023-10-15', 'antybiotyk, co 12 godzin', 'TVP8eMlrGx'),
('hfyijQbFEk', 'Atoris', 'tabletki', 1, 'tabletka', '1.000', NULL, NULL, 'wieczorem', 'TVP8eMlrGx'),
('I5RXfk6SMJ', 'Vessel Due F', 'kapsułki', 2, 'wziew', '1.000', '2023-10-01', '0000-00-00', 'na żyły', 'TVP8eMlrGx'),
('pKxoWapjR_', 'Fostex', 'aerozol in', 2, 'wziew', '2.000', '0000-00-00', '0000-00-00', '', 'TVP8eMlrGx'),
('QlUsgqmh-Z', 'Letrox 50', 'tabletki', 1, 'tabletka', '1.000', NULL, NULL, 'na czczo', 'TVP8eMlrGx'),
('SiZlpKmMDY', 'Enterol', 'saszetki', 2, 'saszetka', '250.000', '2023-10-22', '2023-10-27', 'probiotyk', 'TVP8eMlrGx'),
('UuU9AG-FTQ', 'Acard', 'tabletki', 1, 'tabl', '1.000', '0000-00-00', '0000-00-00', '', 'TVP8eMlrGx'),
('v1qv6UlWjm', 'Bisocard', 'tabletki', 1, 'tabletka', '1.000', '2023-09-26', '2023-09-29', 'na serce', 'TVP8eMlrGx'),
('XWqmzXJpO4', 'Fostex', 'aerozol', 2, 'wziew', '2.000', '2023-09-01', '2024-04-25', '', 'TVP8eMlrGx');

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
(9, NULL, NULL),
(10, NULL, NULL),
(11, NULL, 'C3K0S921ny'),
(12, '0hQXy_wA1_', NULL),
(13, '0hQXy_wA1_', NULL),
(14, '0hQXy_wA1_', 'UuU9AG-FTQ'),
(15, '0hQXy_wA1_', 'v1qv6UlWjm'),
(16, '0hQXy_wA1_', 'hfyijQbFEk'),
(17, NULL, 'UuU9AG-FTQ'),
(18, NULL, 'C3K0S921ny'),
(19, 'DiuEGIINzF', 'pKxoWapjR_'),
(20, 'bBjli-ZVfZ', 'I5RXfk6SMJ'),
(21, 'lc5N8jX1-v', 'SiZlpKmMDY'),
(22, 'lc5N8jX1-v', 'SiZlpKmMDY'),
(23, '25MvMOibhU', 'I5RXfk6SMJ'),
(24, '25MvMOibhU', 'hfyijQbFEk');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `prescription`
--

CREATE TABLE `prescription` (
  `id` varchar(10) NOT NULL,
  `prescriptionNumber` varchar(4) NOT NULL DEFAULT '',
  `issueDate` date DEFAULT NULL,
  `isYearly` tinyint(1) NOT NULL DEFAULT 0,
  `isAntibiotic` tinyint(1) NOT NULL DEFAULT 0,
  `ownerId` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `prescription`
--

INSERT INTO `prescription` (`id`, `prescriptionNumber`, `issueDate`, `isYearly`, `isAntibiotic`, `ownerId`) VALUES
('0hQXy_wA1_', '1001', '2023-10-02', 0, 0, 'TVP8eMlrGx'),
('123asd123w', '4365', '2023-09-30', 1, 0, 'TVP8eMlrGx'),
('25MvMOibhU', '0001', '2023-12-31', 0, 0, 'TVP8eMlrGx'),
('5wE00LiWdU', '4093', '2023-01-01', 0, 0, 'TVP8eMlrGx'),
('Ah5PzJh8_N', '9998', '2023-01-31', 0, 0, 'TVP8eMlrGx'),
('bBjli-ZVfZ', '9999', '2023-10-03', 1, 0, 'TVP8eMlrGx'),
('DiuEGIINzF', '6547', '2023-12-01', 0, 1, 'TVP8eMlrGx'),
('djSkvkv2jd', '9205', '2023-10-01', 0, 0, 'TVP8eMlrGx'),
('lc5N8jX1-v', '2345', '2023-10-22', 1, 0, 'TVP8eMlrGx'),
('m3Z_6udvhA', '0320', '2023-10-24', 0, 1, 'TVP8eMlrGx'),
('qWeRtY9292', '2233', '2023-09-15', 0, 0, 'TVP8eMlrGx'),
('RJc9342Fvv', '1347', '2023-12-31', 0, 1, 'TVP8eMlrGx'),
('StYBNh3dXd', '5673', '2023-09-25', 0, 0, 'TVP8eMlrGx'),
('t35T0wEiD1', '4985', '2023-08-12', 1, 0, 'TVP8eMlrGx'),
('Wv0rawc2J8', '4598', '2023-12-01', 1, 0, 'TVP8eMlrGx'),
('wWs23Sa98z', '2313', '2023-10-02', 1, 0, 'TVP8eMlrGx');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` varchar(10) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(40) NOT NULL,
  `peselNumber` varchar(100) DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `peselNumber`, `password`, `createdAt`, `updatedAt`) VALUES
('test_id', 'username', 'email@email.com', '{\"encrypted\":\"8865148a457861318d92fc491a87d960\",\"ivHex\":\"9e7f4be4fc351435b94c5d2ba38d8bc8\"}', '$2b$10$7jsqJkGvSBrimn3VIOqeleJUuYx/iTPC2h1zgbdpj2UFdJGOzEVaS', '2023-10-26 10:54:38', '2023-10-26 10:54:38'),
('TVP8eMlrGx', 'test', 'test@example.pl', '{\"encrypted\":\"891772250593b7be9f12ba55c62ee518\",\"ivHex\":\"55d6399801ace53c6eee62f73881df2b\"}', '$2b$10$roYwRbAbGjylGIbkN3f8Hum5/hWfZiqXh1T7q.t8phuHyDJuFTM1.', '2023-10-24 19:09:27', '2023-10-24 19:09:37');

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
  ADD UNIQUE KEY `PESELnumber` (`peselNumber`) USING BTREE;

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `medicine_prescription`
--
ALTER TABLE `medicine_prescription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `medicine`
--
ALTER TABLE `medicine`
  ADD CONSTRAINT `FK_medicine_user` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

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
  ADD CONSTRAINT `FK_prescription_user` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;
