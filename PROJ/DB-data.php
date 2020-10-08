<?php

/**
 * ENTER DB CONFIGURATION BELOW
 */
$databaseName = '';
$databaseUser = '';
$databasePassword = '';
$hostName = '';

$pdo = new PDO(`mysql:host=${$hostName};dbname=`.$databaseName, $databaseUser, $databasePassword);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$pdo->exec('INSERT INTO `user`
(email, roles, password, first_name, last_name, profile_picture, wage_per_hour, contact_number)
VALUES ("amy@example.com", "[`ROLE_USER`]", "$argon2i$v=19$m=65536,t=4,p=1$LjOFPHi/Jj+hHsL0mud/uQ$NHJuUa4aByaJF6otluyUeIb4icA6KZ93kkwX6HMb2Q4",
"Amy", "Ross", "https://media.publit.io/file/Untitled-design-X.png", 52.70, "0452845841");
');

echo "1 DING!!\n";

$pdo->exec('INSERT INTO `user`
(email, roles, password, first_name, last_name, profile_picture, wage_per_hour, contact_number)
VALUES ("admin@example.com", "[`ROLE_USER`], [`ROLE_ADMIN`]", "$argon2i$v=19$m=65536,t=4,p=1$LjOFPHi/Jj+hHsL0mud/uQ$NHJuUa4aByaJF6otluyUeIb4icA6KZ93kkwX6HMb2Q4",
"Admin", "User", "https://media.publit.io/file/avatar-nG.png", 52.70, "0452845841");
');

echo "2 DING!!\n";

$pdo->exec('INSERT INTO `user`
(email, roles, password, first_name, last_name, profile_picture, wage_per_hour, contact_number)
VALUES ("mynewemail@example.com", "[`ROLE_USER`]", "$argon2i$v=19$m=65536,t=4,p=1$6RO6DWYvOyMvg2dQbDt2eA$rMwyjOdlD+peBGhbhUZNdL8tRkIc0YWhn+BudOdhp20",
"Admin", "Johnson", "https://media.publit.io/file/Canva-Man-s-Face.jpg", 45.35, "045258152");
');

echo "3 DING!!\n";

$pdo->exec('INSERT INTO `user`
(email, roles, password, first_name, last_name, profile_picture, wage_per_hour, contact_number)
VALUES ("a3e759f3-5eaa-46a1-bf92-7e8ed75f122b", "katie@example.com", "[`ROLE_USER`]",
"$argon2i$v=19$m=65536,t=4,p=1$lA9bNDWPRZMSQYNMT/8jCQ$Nt8EXl2ZXIM6qq9uzZOVrM33xKmB0RL4qx86T+ERH98",
"Katie", "Paris", "https://media.publit.io/file/Canva-Closeup-Photo-of-Woman-Wearing-Eyeglasses.jpg", 52.35, "045215418");
');

echo "4 DING!!\n";

$pdo->exec('INSERT INTO `user`
(email, roles, password, first_name, last_name, profile_picture, wage_per_hour, contact_number)
VALUES ("amy@example.com", "[`ROLE_USER`]",
"$argon2i$v=19$m=65536,t=4,p=1$lA9bNDWPRZMSQYNMT/8jCQ$Nt8EXl2ZXIM6qq9uzZOVrM33xKmB0RL4qx86T+ERH98",
"Amy", "Ross", "https://media.publit.io/file/Canva-Closeup-Photo-of-Woman-Wearing-Eyeglasses.jpg", 52.35, "045215418");
');

echo "5 DING!!\n ... is final DING";
