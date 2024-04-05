-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 03, 2024 at 10:22 AM
-- Server version: 5.7.23-23
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jakeelvi_social_media_rpg`
--

-- --------------------------------------------------------

--
-- Table structure for table `connects_to`
--

CREATE TABLE `connects_to` (
  `connection_ID` int(10) NOT NULL,
  `location_ID` int(10) NOT NULL,
  `location_ID_2` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `connects_to`
--

INSERT INTO `connects_to` (`connection_ID`, `location_ID`, `location_ID_2`) VALUES
(1, 1, 2),
(2, 1, 3),
(3, 3, 6),
(4, 1, 4),
(5, 4, 5),
(6, 5, 6);

-- --------------------------------------------------------

--
-- Table structure for table `currently_in`
--

CREATE TABLE `currently_in` (
  `character_ID` int(10) NOT NULL,
  `sublocation_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `currently_in`
--

INSERT INTO `currently_in` (`character_ID`, `sublocation_ID`) VALUES
(1, 5),
(2, 10),
(3, 9),
(4, 20),
(5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `has_item`
--

CREATE TABLE `has_item` (
  `character_ID` int(10) DEFAULT NULL,
  `sublocation_ID` int(10) DEFAULT NULL,
  `item_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `has_item`
--

INSERT INTO `has_item` (`character_ID`, `sublocation_ID`, `item_ID`) VALUES
(1, NULL, 1),
(2, NULL, 2),
(3, NULL, 3),
(4, NULL, 4),
(5, NULL, 5),
(1, NULL, 6),
(1, NULL, 7),
(2, NULL, 8),
(4, NULL, 9),
(NULL, 1, 10),
(NULL, 2, 11),
(2, NULL, 12),
(NULL, 4, 13),
(5, NULL, 14),
(NULL, 9, 15),
(NULL, 20, 16),
(NULL, 18, 17),
(NULL, 12, 18),
(NULL, 16, 19),
(NULL, 20, 20),
(NULL, 11, 21),
(NULL, 7, 22),
(NULL, 4, 23),
(NULL, 6, 24),
(NULL, 8, 25),
(NULL, 21, 26),
(NULL, 5, 27),
(NULL, 14, 28),
(NULL, 9, 29),
(NULL, 10, 30),
(NULL, 22, 31),
(NULL, 21, 32),
(NULL, 17, 33),
(NULL, 18, 34),
(NULL, 19, 35),
(NULL, 16, 36),
(NULL, 17, 37),
(NULL, 8, 38),
(1, NULL, 39),
(2, NULL, 40),
(3, NULL, 41),
(NULL, 4, 42),
(NULL, 5, 43),
(NULL, 7, 44),
(NULL, 9, 45);

-- --------------------------------------------------------

--
-- Table structure for table `is_part_of`
--

CREATE TABLE `is_part_of` (
  `sublocation_ID` int(10) NOT NULL,
  `location_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `is_part_of`
--

INSERT INTO `is_part_of` (`sublocation_ID`, `location_ID`) VALUES
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 4),
(11, 4),
(12, 4),
(13, 4),
(14, 2),
(15, 5),
(16, 5),
(17, 5),
(18, 5),
(19, 6),
(20, 6),
(21, 3),
(22, 3);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_ID` int(10) UNSIGNED NOT NULL,
  `type` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_ID`, `type`) VALUES
(1, 'longsword'),
(2, 'shortsword'),
(3, 'health potion'),
(4, 'staff'),
(5, 'health potion'),
(6, 'clay ball'),
(7, 'sprig of mint'),
(8, 'lamb chop'),
(9, 'apple'),
(10, 'wand'),
(11, 'crystal ball'),
(12, 'sprig of basil'),
(13, 'longbow'),
(14, 'crossbow'),
(15, 'brass key'),
(16, 'woodcarving knife'),
(17, 'cucumber'),
(18, 'crowbar'),
(19, 'longsword'),
(20, 'paintbrush'),
(21, 'bread'),
(22, 'fire resistance potion'),
(23, 'hemlock poison'),
(24, 'arrow'),
(25, 'arrow'),
(26, 'arrow'),
(27, 'arrow'),
(28, 'crossbow bolt'),
(29, 'crossbow bolt'),
(30, 'crossbow bolt'),
(31, 'meat cleaver'),
(32, 'lantern'),
(33, 'torch'),
(34, 'oil lamp'),
(35, 'ivory statue'),
(36, 'tongs'),
(37, 'hammer'),
(38, 'wooden plank'),
(39, 'cabbage'),
(40, 'bottle of wine'),
(41, 'trowel'),
(42, 'javelin'),
(43, 'spear'),
(44, 'battle axe'),
(45, 'potato');

-- --------------------------------------------------------

--
-- Table structure for table `item_type`
--

CREATE TABLE `item_type` (
  `type_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `category` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `cost` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `item_type`
--

INSERT INTO `item_type` (`type_name`, `category`, `cost`) VALUES
('anvil', 'blacksmith\'s tools', 12),
('apple', 'food', 1),
('arrow', 'ranged weapon', 1),
('bag of beans', 'food', 2),
('battle axe', 'melee weapon', 8),
('bellows', 'blacksmith\'s tools', 9),
('bottle of ale', 'drink', 7),
('bottle of beer', 'drink', 5),
('bottle of mead', 'drink', 8),
('bottle of wine', 'drink', 9),
('bread roll', 'food', 1),
('bucket of berries', 'food', 5),
('bunch of grapes', 'food', 5),
('cabbage', 'food', 2),
('candle', 'light', 1),
('canvas', 'painter\'s tools', 7),
('carrot', 'food', 1),
('cauliflower', 'food', 3),
('chicken', 'food', 8),
('clay ball', 'potter\'s tools', 3),
('club', 'melee weapon', 1),
('component pouch', 'arcane focus', 15),
('crossbow', 'ranged weapon', 17),
('crossbow bolt', 'ranged weapon', 1),
('crowbar', 'thieves\' tools', 4),
('crystal ball', 'arcane focus', 30),
('cucumber', 'food', 2),
('dark vision potion', 'potion', 17),
('diamond ring', 'treasure', 100),
('easel', 'painter\'s tools', 15),
('egg', 'food', 1),
('energy potion', 'potion', 10),
('file', 'blacksmith\'s tools', 6),
('fire breathing potion', 'potion', 20),
('fire resistance potion', 'potion', 15),
('glass cutter', 'thieves\' tools', 20),
('golden statue', 'treasure', 60),
('grappling hook', 't', 10),
('halberd', 'melee weapon', 5),
('hammer', 'blacksmith\'s tools', 9),
('handsaw', 'carpenter\'s tools', 8),
('health potion', 'potion', 10),
('hedge clippers', 'gardener\'s tools', 4),
('hemlock poison', 'potion', 8),
('hoe', 'gardener\'s tools', 5),
('hunting bow', 'ranged weapon', 7),
('ivory statue', 'treasure', 45),
('javelin', 'ranged weapon', 3),
('lamb chop', 'food', 14),
('lance', 'melee weapon', 5),
('lantern', 'light', 4),
('loaf of bread', 'food', 4),
('lock pick', 'thieves\' tools', 6),
('longbow', 'ranged weapon', 10),
('longsword', 'melee weapon', 20),
('mace', 'melee weapon', 15),
('mallet', 'carpenter\'s tools', 3),
('meat cleaver', 'butcher\'s tools', 5),
('mutton chop', 'food', 11),
('oil lamp', 'light', 5),
('paint pigments', 'painter\'s tools', 35),
('paintbrush', 'painter\'s tools', 3),
('pike', 'melee weapon', 4),
('pitchfork', 'gardener\'s tools', 5),
('pork chop', 'food', 9),
('potato', 'food', 1),
('pottery wheel', 'potter\'s tools', 10),
('rake', 'gardener\'s tools', 4),
('rapier', 'melee weapon', 25),
('ruby ring', 'treasure', 90),
('sandpaper', 'carpenter\'s tools', 1),
('sapphire ring', 'treasure', 85),
('shortsword', 'melee weapon', 17),
('shovel', 'miner\'s tools', 5),
('silver statue', 'treasure', 50),
('small brass key', 'key', 2),
('small bronze key', 'key', 2),
('small gold key', 'key', 25),
('small silver key', 'key', 22),
('smoke bomb', 'thieves\' tools', 20),
('spear', 'melee weapon', 3),
('sprig of basil', 'food', 2),
('sprig of mint', 'food', 2),
('staff', 'arcane focus', 20),
('steak', 'food', 12),
('steak knife', 'butcher\'s tools', 3),
('tongs', 'blacksmith\'s tools', 8),
('torch', 'light', 2),
('trowel', 'gardener\'s tools', 4),
('underwater breathing potion', 'potion', 18),
('venison', 'food', 8),
('wand', 'arcane focus', 17),
('war hammer', 'melee weapon', 14),
('watering can', 'gardener\'s tools', 4),
('watermelon', 'food', 7),
('wheel of cheese', 'food', 7),
('wood chisel', 'carpenter\'s tools', 5),
('wood glue', 'carpenter\'s tools', 7),
('woodcarving knife', 'carpenter\'s tools', 5),
('wooden plank', 'carpenter\'s tools', 3);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `location_type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `region` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_ID`, `name`, `location_type`, `description`, `region`) VALUES
(1, 'Eldamaria', 'city', 'This grand city of marble and gold was built up centuries ago by elves and dwarves around the temple of Eldama in honor to their shared gods and as a cooperation of peace between them. However, many of the buildings and sculptures were destroyed when the two groups broke out in civil war. The royal family of Willama took power in the aftermath and is now trying to find skilled artisans to restore the city to its former glory.', 'Salamar'),
(2, 'Willishire', 'town', 'A small farming town on the outskirts of Eldamaria populated mostly by humans and halflings. The inhabitants here make most of their money selling food to the travelling artisans on their way to Eldamaria and offering tool repairs.', 'Salamar'),
(3, 'Pescaroppola', 'city', 'This city started out as a small fishing village, but due to its sheltered location at the mouth of the Pescara Bay away from the rough waves and winds of the open ocean, it drew the interest of seafaring explorers and grew rapidly. Now it is a major trading hub for foreign goods from across the sea.', 'Salamar'),
(4, 'Mine of Mulkrath', 'mine', 'This mine was created by the dwarf lord Mulkrath in an attempt to find a sacred stone of the fire gods lost deep in the earth. However, too many workers became swallowed up in the depths of the mine, and the project was abandoned. The place is feared by many, though a very few daring and wealth-seeking adventurers have tried to plumb its depths through the years.', 'Kendakrath Mountains'),
(5, 'Bolskar Cave', 'cave', 'A craggy cave with twisting chambers. Rumors of ghosts haunting the depths keep many travelers and locals from entering, making it a popular hiding place for thieves.', 'Kendakrath Mountains'),
(6, 'Krevla', 'village', 'A small goat herding village on the cliffs of the Kendakrath mountain range. The gnomes and halflings who live here tend to keep to themselves due to the isolation of the cliffs they live on.', 'Kendakrath Mountains');

-- --------------------------------------------------------

--
-- Table structure for table `player_character`
--

CREATE TABLE `player_character` (
  `character_ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `race` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `class` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `tool_proficiency` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `weapon_proficiency` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `health_points` int(10) UNSIGNED NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `player_character`
--

INSERT INTO `player_character` (`character_ID`, `name`, `race`, `class`, `tool_proficiency`, `weapon_proficiency`, `health_points`, `date_created`) VALUES
(1, 'Leron Stoderioth', 'half-elf', 'wizard', 'calligrapher\'s tools', 'arcane focus', 10, '2024-02-23'),
(2, 'Justus Fiendcrusher', 'tiefling', 'paladin', 'blacksmith\'s tools', 'melee weapons', 15, '2024-02-23'),
(3, 'Holkur the Thunderfist', 'dwarf', 'fighter', 'blacksmith\'s tools', 'melee weapons', 14, '2024-02-23'),
(4, 'Gustavus Ferdinando III', 'human', 'bard', 'stringed instrument', 'melee weapons', 11, '2024-02-23'),
(5, 'Father Patrick O\'Flannigan', 'halfling', 'cleric', 'carpenter\'s tools', 'ranged weapons', 13, '2024-02-23');

-- --------------------------------------------------------

--
-- Table structure for table `plays`
--

CREATE TABLE `plays` (
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `character_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `plays`
--

INSERT INTO `plays` (`username`, `character_ID`) VALUES
('Nathaniel_N', 1),
('Nathaniel_N', 2),
('Nathaniel_N', 3),
('Nathaniel_N', 4),
('Nathaniel_N', 5);

-- --------------------------------------------------------

--
-- Table structure for table `sublocation`
--

CREATE TABLE `sublocation` (
  `sublocation_ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `building_type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_locked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sublocation`
--

INSERT INTO `sublocation` (`sublocation_ID`, `name`, `building_type`, `description`, `is_locked`) VALUES
(1, 'Deren\'s Smithy', 'smithy', 'The local smithy in Willishire.', 0),
(2, 'Marva\'s Bakery', 'bakery', 'The local bakery in Willishire.', 0),
(3, 'The Goblin\'s Tankard', 'tavern', 'The most reputable and high-quality tavern in Willishire. Also, the only tavern in Willishire. Go figure.', 0),
(4, 'Harwin\'s Farmstead', 'farmhouse', 'The farmhouse of Harwin, the elderly keeper of the town\'s orchard.', 0),
(5, 'Temple of Eldamar', 'temple', 'The tallest building in Eldamaria, this temple\'s central spire is visible from anywhere in the town. Most of its carvings and gold were looted or destroyed during the city\'s civil war, so access is now heavily restricted.', 1),
(6, 'Eldamaria Market District', 'outdoors', 'People pack in from all over the city to set up tents and sell their wares, both citizens of the city and traveling artisans looking to sell some extra wares on the side of their renovation jobs in the city.', 0),
(7, 'The King\'s Goblet', 'tavern', 'This tavern is the one most frequented by the artisans hired by the royal family. They offer a wide selection of high quality beverages, meals, and amenities, but don\'t expect them to come cheap.', 0),
(8, 'The Raven\'s Beak', 'tavern', 'A dark and dingy tavern, avoided by all who have any respect for the law. A favorite place for lowlifes to make shady deals. Bar fights are practically a matter of course.', 0),
(9, 'Bellastra Palace: Royal Hall', 'palace room', 'The royal banquet hall of the king of Eldamaria.', 1),
(10, 'mine entrance', 'mine', 'The entrance to the Mine of Mukrath. A few old tools are still left lying around. The air is stuffy, and the scaffolding leading into the depths of the mine is rotting in various places. Proceed with caution.', 0),
(11, 'Lower scaffold', 'mine', 'The area at the bottom of the ancient scaffolding is pitch black, untouched by sunlight, but with a lantern or torch one can see the glimmer of silver and platinum ores in the walls, still untouched by the dwarven pickaxes that used to dig here. ', 0),
(12, 'Left tunnel', 'mine', 'A long, dark tunnel, leading slowly further down into the earth. Is that a glowing red light in the distance?', 0),
(13, 'Ventilation shaft', 'mine', 'Looking up from this small cavern carved into the roof of the tunnel above, one can just barely make out a speck of daylight. At least, hopefully that\'s daylight.', 0),
(14, 'Willishire Main Street', 'outdoors', 'The main street of Willishire, where most of the shops and taverns are lined up.', 0),
(15, 'Cave entrance', 'cave', 'The entrance to the Bolskar cave system. Even the depths of the cave cannot mask the occasional sounds that echo from deep within. ', 0),
(16, 'Cave tunnel', 'cave', 'A crevice in the wall of the entrance leads to this tunnel inside the cave. The air is moist, making the surface of the rock slimy and slippery.', 0),
(17, 'Cave pool', 'cave', 'A warm pool deep in the cave with stalagmites sticking out from within. Steam emanates from the surface of the pool, feeding the moss growing on the cave wall.', 0),
(18, 'Craggy hideout', 'cave', 'On one side of the cave pool is a smaller cavern with treasure chests. It seems to be frequented by thieves who store their loot here.', 0),
(19, 'Krobble\'s Farmhouse', 'farmhouse', 'The farmhouse of Krobble, a gnome who experiments with various cheesemaking equipment and methods.', 1),
(20, 'Rungle\'s Farmhouse', 'farmhouse', 'The farmhouse of the shepherd gnome Rungle and his wife Dimpie who specializes in the making of fine woolen garments.', 0),
(21, 'Merchants\' Harbor', 'harbor', 'The harbor in Pescaroppola where foreign merchants arrive to unload their wares. ', 0),
(22, 'Fishers\' Harbor', 'harbor', 'The harbor of Pescaroppola for fishing boats. It has expanded since the original founding of the city, but still has its distinctive smell of saltwater and fish innards.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `unlocks`
--

CREATE TABLE `unlocks` (
  `unlock_ID` int(10) NOT NULL,
  `item_ID` int(10) NOT NULL,
  `sublocation_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `unlocks`
--

INSERT INTO `unlocks` (`unlock_ID`, `item_ID`, `sublocation_ID`) VALUES
(1, 7, 5),
(2, 9, 5),
(3, 46, 9),
(4, 15, 7);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`email`, `username`, `password`) VALUES
('anishmaharjan@uri.edu', 'AnishM', 'Snailshell-545'),
('jake_elvin@uri.edu', 'Jake_E', 'Whatever90.'),
('jose_harvey@uri.edu', 'Jose_H', 'Josespassword22!'),
('nnichols@uri.edu', 'Nathaniel_N', 'Ilovefantasy11!');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `connects_to`
--
ALTER TABLE `connects_to`
  ADD PRIMARY KEY (`connection_ID`);

--
-- Indexes for table `currently_in`
--
ALTER TABLE `currently_in`
  ADD PRIMARY KEY (`character_ID`);

--
-- Indexes for table `has_item`
--
ALTER TABLE `has_item`
  ADD PRIMARY KEY (`item_ID`);

--
-- Indexes for table `is_part_of`
--
ALTER TABLE `is_part_of`
  ADD PRIMARY KEY (`sublocation_ID`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_ID`);

--
-- Indexes for table `item_type`
--
ALTER TABLE `item_type`
  ADD PRIMARY KEY (`type_name`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_ID`);

--
-- Indexes for table `player_character`
--
ALTER TABLE `player_character`
  ADD PRIMARY KEY (`character_ID`);

--
-- Indexes for table `plays`
--
ALTER TABLE `plays`
  ADD PRIMARY KEY (`character_ID`);

--
-- Indexes for table `sublocation`
--
ALTER TABLE `sublocation`
  ADD PRIMARY KEY (`sublocation_ID`);

--
-- Indexes for table `unlocks`
--
ALTER TABLE `unlocks`
  ADD PRIMARY KEY (`unlock_ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
