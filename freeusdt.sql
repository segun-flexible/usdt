-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2022 at 11:28 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freeusdt`
--

-- --------------------------------------------------------

--
-- Table structure for table `f_admins`
--

CREATE TABLE `f_admins` (
  `uid` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `f_admins`
--

INSERT INTO `f_admins` (`uid`, `username`, `fullname`, `email`, `phone_number`, `address`, `state`, `city`, `password`, `avatar`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin admin', 'admin@gmail.com', '+2349021020972', NULL, NULL, NULL, '$2a$09$fGazgGsofJWiMjt/T0m4LO6ZTTLK1sG7xBWCg3yDEBYkDpOWGdQku', NULL, 1, '2021-06-06 06:10:59', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `f_plans`
--

CREATE TABLE `f_plans` (
  `p_id` bigint(20) NOT NULL,
  `p_name` varchar(255) NOT NULL,
  `p_price` decimal(65,30) NOT NULL DEFAULT 0.000000000000000000000000000000,
  `p_daily_withdrawal_limit` decimal(65,30) NOT NULL DEFAULT 0.000000000000000000000000000000,
  `p_total_withdrawal_limit` decimal(65,30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `f_plans`
--

INSERT INTO `f_plans` (`p_id`, `p_name`, `p_price`, `p_daily_withdrawal_limit`, `p_total_withdrawal_limit`) VALUES
(1, 'VIP 1', '100.000000000000000000000000000000', '500.000000000000000000000000000000', '5000.000000000000000000000000000000'),
(2, 'VIP 2', '300.000000000000000000000000000000', '1500.000000000000000000000000000000', '4000.000000000000000000000000000000');

-- --------------------------------------------------------

--
-- Table structure for table `f_proof`
--

CREATE TABLE `f_proof` (
  `pr_id` bigint(20) NOT NULL,
  `pr_user` bigint(20) NOT NULL,
  `pr_planid` varchar(255) NOT NULL,
  `pr_proof` varchar(255) NOT NULL,
  `pr_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `f_proof`
--

INSERT INTO `f_proof` (`pr_id`, `pr_user`, `pr_planid`, `pr_proof`, `pr_created_at`) VALUES
(6, 2, '2', '/img/proof/proof-df057fb868a8.jpg', '2022-04-23 19:29:49');

-- --------------------------------------------------------

--
-- Table structure for table `f_recharge_history`
--

CREATE TABLE `f_recharge_history` (
  `h_id` bigint(20) UNSIGNED NOT NULL,
  `ref` varchar(255) NOT NULL,
  `amount` decimal(65,30) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `issue_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `f_sub_history`
--

CREATE TABLE `f_sub_history` (
  `h_id` bigint(20) UNSIGNED NOT NULL,
  `ref` varchar(255) NOT NULL,
  `amount` decimal(65,30) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `plan_name` varchar(255) NOT NULL,
  `plan_id` bigint(20) NOT NULL,
  `issue_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `f_sub_history`
--

INSERT INTO `f_sub_history` (`h_id`, `ref`, `amount`, `user_id`, `plan_name`, `plan_id`, `issue_at`) VALUES
(9, 'TRXb78d0fb5a6d3', '300.000000000000000000000000000000', 2, 'VIP 2 ', 2, '2022-04-23 21:04:48'),
(10, 'TRXae976fccfce6', '300.000000000000000000000000000000', 2, 'VIP 2 ', 2, '2022-04-23 21:06:12'),
(11, 'TRX407246d3d373', '300.000000000000000000000000000000', 2, 'VIP 2 ', 2, '2022-04-23 21:06:55'),
(12, 'TRX8aad71e7de52', '300.000000000000000000000000000000', 2, 'VIP 2 ', 2, '2022-04-23 21:07:45');

-- --------------------------------------------------------

--
-- Table structure for table `f_transaction_history`
--

CREATE TABLE `f_transaction_history` (
  `h_id` bigint(20) UNSIGNED NOT NULL,
  `ref` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `amount` decimal(65,30) NOT NULL,
  `charges` decimal(65,30) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `reciever_id` bigint(20) NOT NULL,
  `reciever_acct` varchar(255) NOT NULL,
  `issue_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `f_users`
--

CREATE TABLE `f_users` (
  `uid` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `account_no` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pin` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `plan_name` varchar(255) DEFAULT NULL,
  `plan_id` bigint(20) DEFAULT 0,
  `country` varchar(255) DEFAULT NULL,
  `balance` decimal(65,30) NOT NULL DEFAULT 0.000000000000000000000000000000,
  `wallet_type` text NOT NULL,
  `wallet_address` text NOT NULL,
  `p_daily_withdrawal_limit` decimal(65,30) NOT NULL DEFAULT 0.000000000000000000000000000000,
  `p_total_withdrawal_limit` decimal(65,30) NOT NULL DEFAULT 0.000000000000000000000000000000,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `f_users`
--

INSERT INTO `f_users` (`uid`, `username`, `account_no`, `email`, `password`, `pin`, `phone_number`, `plan_name`, `plan_id`, `country`, `balance`, `wallet_type`, `wallet_address`, `p_daily_withdrawal_limit`, `p_total_withdrawal_limit`, `created_at`, `updated_at`) VALUES
(1, 'test', '5040966914', 'test@gmail.com', '$2a$09$eQ2hsNda6Sb9Ry2OK4zuDeFCcgAu4btJrqmbP4rG3h1IwS3vlyC8W', '1234', '12', NULL, 0, 'Algeria', '0.000000000000000000000000000000', 'erc20', '2928928981221ssssss', '0.000000000000000000000000000000', '0.000000000000000000000000000000', '2022-04-22 10:33:59', '2022-04-23 21:20:27'),
(2, 'user', '4132534862', 'user@gmail.com', '$2a$09$ZKTw94oygo5CmEDZ87zlveJyLl/466BjzSu0iGjVDVsGyseAQ/aTy', '1111', '222', 'VIP 2 ', 2, 'Guinea-Bissau', '100.000000000000000000000000000000', 'trc20', '222', '0.000000000000000000000000000000', '0.000000000000000000000000000000', '2022-04-23 16:30:16', '2022-04-23 21:20:36');

-- --------------------------------------------------------

--
-- Table structure for table `f_website_settings`
--

CREATE TABLE `f_website_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `website_title` varchar(255) NOT NULL DEFAULT 'My Website',
  `website_tagline` varchar(255) NOT NULL DEFAULT 'Cool Website',
  `website_description` text NOT NULL,
  `website_url` varchar(255) NOT NULL,
  `website_logo` varchar(255) DEFAULT NULL,
  `website_favicon` varchar(255) DEFAULT NULL,
  `website_email` varchar(255) DEFAULT NULL,
  `website_author` varchar(255) DEFAULT NULL,
  `website_currency` varchar(10) NOT NULL DEFAULT '₦',
  `website_coinbase_key` varchar(255) DEFAULT NULL,
  `website_header_code` longtext DEFAULT NULL,
  `website_footer_code` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `f_website_settings`
--

INSERT INTO `f_website_settings` (`id`, `website_title`, `website_tagline`, `website_description`, `website_url`, `website_logo`, `website_favicon`, `website_email`, `website_author`, `website_currency`, `website_coinbase_key`, `website_header_code`, `website_footer_code`) VALUES
(1, 'My Website', 'Cool Website', 'here is my w1ebsite', 'http://loc2alhost:3000', '/img/identity/website_logo.jpg', '/img/identity/website_favicon.jpg', 'admin@gmail.com', NULL, '₦', 'd427a229-398f-434e-a777-bfe0edae1758', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `f_withdrawal_history`
--

CREATE TABLE `f_withdrawal_history` (
  `h_id` bigint(20) UNSIGNED NOT NULL,
  `ref` varchar(255) NOT NULL,
  `amount` decimal(65,30) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `reciever_wallet` varchar(255) NOT NULL,
  `charges` decimal(65,30) NOT NULL,
  `issue_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `f_admins`
--
ALTER TABLE `f_admins`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);

--
-- Indexes for table `f_plans`
--
ALTER TABLE `f_plans`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `f_proof`
--
ALTER TABLE `f_proof`
  ADD PRIMARY KEY (`pr_id`),
  ADD KEY `pr_user` (`pr_user`);

--
-- Indexes for table `f_recharge_history`
--
ALTER TABLE `f_recharge_history`
  ADD UNIQUE KEY `h_id` (`h_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `f_sub_history`
--
ALTER TABLE `f_sub_history`
  ADD UNIQUE KEY `h_id` (`h_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `f_transaction_history`
--
ALTER TABLE `f_transaction_history`
  ADD UNIQUE KEY `h_id` (`h_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `reciever_id` (`reciever_id`);

--
-- Indexes for table `f_users`
--
ALTER TABLE `f_users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `account_no` (`account_no`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);

--
-- Indexes for table `f_website_settings`
--
ALTER TABLE `f_website_settings`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `f_withdrawal_history`
--
ALTER TABLE `f_withdrawal_history`
  ADD UNIQUE KEY `h_id` (`h_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `f_admins`
--
ALTER TABLE `f_admins`
  MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `f_plans`
--
ALTER TABLE `f_plans`
  MODIFY `p_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `f_proof`
--
ALTER TABLE `f_proof`
  MODIFY `pr_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `f_recharge_history`
--
ALTER TABLE `f_recharge_history`
  MODIFY `h_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `f_sub_history`
--
ALTER TABLE `f_sub_history`
  MODIFY `h_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `f_transaction_history`
--
ALTER TABLE `f_transaction_history`
  MODIFY `h_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `f_users`
--
ALTER TABLE `f_users`
  MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `f_website_settings`
--
ALTER TABLE `f_website_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `f_withdrawal_history`
--
ALTER TABLE `f_withdrawal_history`
  MODIFY `h_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `f_proof`
--
ALTER TABLE `f_proof`
  ADD CONSTRAINT `f_proof_ibfk_1` FOREIGN KEY (`pr_user`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `f_recharge_history`
--
ALTER TABLE `f_recharge_history`
  ADD CONSTRAINT `f_recharge_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `f_sub_history`
--
ALTER TABLE `f_sub_history`
  ADD CONSTRAINT `f_sub_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `f_transaction_history`
--
ALTER TABLE `f_transaction_history`
  ADD CONSTRAINT `f_transaction_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `f_transaction_history_ibfk_2` FOREIGN KEY (`reciever_id`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `f_withdrawal_history`
--
ALTER TABLE `f_withdrawal_history`
  ADD CONSTRAINT `f_withdrawal_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
