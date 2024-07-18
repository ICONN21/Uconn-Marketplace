INSERT INTO browse (id, item_image, item_title, item_description, active)
VALUES (001, '#', '3/4th violin', 'old violin 3/4ths sized but in good condition', true),
       (002, '#', 'Coat', 'old coat in decent condition', true),
       (003, '#', 'RV', 'old 2005 rv, sold as is!', true),
       (004, '#', 'Gaming Laptop', 'Lazer gaming laptiop 64gb ram', false);

INSERT INTO post (id, item_image, item_title, item_description, active)
VALUES (001, '#', 'chocolate', 'really good homemade chocolate', true),
       (002, '#', 'darth vader', 'sucks at stealth', true),
       (003, '#', 'ice skates', 'figure skates that need sharpening', true),
       (004, '#', 'hot air balloon', '300 bucks a ride', false);

INSERT INTO favorites (id, item_image, item_title, item_description, active)
VALUES (001, '#', '3/4th violin', 'old violin 3/4ths sized but in good condition', true),
       (002, '#', 'Gaming Laptop', 'Lazer gaming laptiop 64gb ram', false);

INSERT INTO users (id, user_name, user_password)
VALUES (001, '#', '#'),
       (002, '#', '#');
       