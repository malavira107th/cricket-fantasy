CREATE TABLE `contests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` varchar(100) NOT NULL,
	`matchName` varchar(255) NOT NULL,
	`team1` varchar(100) NOT NULL,
	`team2` varchar(100) NOT NULL,
	`team1Code` varchar(10),
	`team2Code` varchar(10),
	`team1Img` text,
	`team2Img` text,
	`matchType` varchar(50),
	`venue` varchar(255),
	`startTime` timestamp NOT NULL,
	`status` enum('upcoming','live','completed','cancelled') NOT NULL DEFAULT 'upcoming',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teamPlayers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teamId` int NOT NULL,
	`playerId` varchar(100) NOT NULL,
	`playerName` varchar(255) NOT NULL,
	`playerRole` varchar(50) NOT NULL,
	`playerTeam` varchar(100) NOT NULL,
	`points` int NOT NULL DEFAULT 0,
	`isCaptain` boolean NOT NULL DEFAULT false,
	`isViceCaptain` boolean NOT NULL DEFAULT false,
	CONSTRAINT `teamPlayers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contestId` int NOT NULL,
	`teamName` varchar(100) NOT NULL,
	`captainId` varchar(100) NOT NULL,
	`viceCaptainId` varchar(100) NOT NULL,
	`totalPoints` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userContests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contestId` int NOT NULL,
	`teamId` int NOT NULL,
	`rank` int,
	`totalPoints` int NOT NULL DEFAULT 0,
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userContests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `state` varchar(100);