-------------------------------------------------
-- SQL CODE TO INITALISE DATABASE FROM SCRATCH --
-------------------------------------------------

-- DROP EVERYTHING
DROP TABLE IF EXISTS wk09_users CASCADE;
DROP TABLE IF EXISTS wk09_posts CASCADE;
DROP TABLE IF EXISTS wk09_comments CASCADE;
DROP TABLE IF EXISTS wk09_follows CASCADE;


-- USERS TABLE
CREATE TABLE IF NOT EXISTS wk09_users (
    id SERIAL PRIMARY KEY,
    clerk_id VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(12) UNIQUE NOT NULL,
    avatar VARCHAR(500),
    location VARCHAR(30) NOT NULL,
    bio VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- POSTS TABLE
CREATE TABLE IF NOT EXISTS wk09_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    user_id VARCHAR(100) REFERENCES wk09_users(clerk_id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- COMMENTS TABLE
CREATE TABLE IF NOT EXISTS wk09_comments (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES wk09_posts(id) ON DELETE CASCADE,
    user_id VARCHAR(100) REFERENCES wk09_users(clerk_id),
    content VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- FOLLOWS TABLE
CREATE TABLE IF NOT EXISTS wk09_follows (
    id SERIAL PRIMARY KEY,
    follower_id INT REFERENCES wk09_users(id),
    followee_id INT REFERENCES wk09_users(id),
    UNIQUE(follower_id, followee_id)
);


-- SEED TABLE: USERS
INSERT INTO wk09_users (clerk_id, username, avatar, location, bio) VALUES
('user_2ivL1p1jN8EMTsM7GuAi8ewdyMA', 'Jane Doe', 'https://i.imgur.com/1e9bqnm.png', 'Leeds', 'I am Jane Doe, the admin of Converso! I love hamsters! Nice to meet you!'),
('user_2ivJ5W6Y7hWCY8MElnBkH28DyFz', 'John Smith', 'https://i.imgur.com/v1wN5qE.png', 'London', 'Howdy! My name is John Smith. I am a moderator of Converso.'),
('user_2ivKM9QcB1Cu64lAxWXd6VpenLt', 'BentoBox', 'https://i.imgur.com/m4KD2PK.jpeg', 'Tokyo', 'I am a test user with no special role.'),
('user_2ipgNI0KXcEMNTYgolHSpLDgkLT', 'idontpost', 'https://i.imgur.com/ATmQAoC.jpeg', 'Quiet', 'I am not going to post anything, so you will not see any posts or comments listed below my user profile!');


-- SEED TABLE: POSTS
INSERT INTO wk09_posts (title, content, user_id) VALUES
('Hello, world! (Test Post)', 'Hello there! I am excited to share my thoughts with you all. Let’s start with a warm greeting: Hello, world! Today, I just wanted to write something lighthearted and fun. Sometimes, we just need to ramble a bit to get our thoughts flowing. So here I am, typing away, filling the void with words. How’s everyone doing today? Anyone else feel like sharing a random thought or two? Let’s make this a space for open, carefree conversation!', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA'),
('Howdy, everyone!', 'This is another test post. Howdy! I hope everyone is having a fantastic day. Just thought I’d drop by to say a quick hello and see how everyone’s doing. Feel free to share any updates or thoughts you have. It’s always great to connect with you all, even if just briefly. Let’s keep this community lively and full of positive energy. What’s everyone been up to lately? Any fun plans for the weekend? Let’s chat!', 'user_2ivJ5W6Y7hWCY8MElnBkH28DyFz'),
('I have an itchy patch on my arm', 'Seriously, why does this keep happening to me? My arm seems to have a personal vendetta against me with this constant itchiness. I’ve tried all sorts of remedies, but nothing seems to work for long. Does anyone else deal with this? What did I ever do to deserve this irritation? It’s driving me crazy! If anyone has any tips or similar experiences, please share. I’m desperate for some relief and a solution that actually works.', 'user_2ivJ5W6Y7hWCY8MElnBkH28DyFz'),
('Tasty Lemon Tarts', 'Which supermarket does the best lemon tart? I’m on a quest to find the most delicious one out there. I’ve tried a few, but I’m curious about everyone else’s favorites. Do you have a go-to spot for your lemon tart cravings? Maybe there’s a hidden gem I’ve missed. Let’s discuss our top picks and what makes them stand out. The perfect balance of tartness and sweetness is key. Looking forward to hearing your recommendations!', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA'),
('What should I name my new hamster?', 'Syrian hamster. Grey coat. Suggestions please! I just got a new furry friend, and I’m struggling to come up with the perfect name. I’m looking for something cute, maybe a bit unique. I’d love to hear your ideas! What names do you think would suit a little grey Syrian hamster? I want something that stands out and captures his personality. Thanks in advance for your creative suggestions!', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA'),
('Just where did summer go?', 'It is already July and I am still wearing my big cozy winter down coat. It feels like summer just never arrived this year. Is anyone else experiencing this weird weather? I was looking forward to some sunny, warm days, but it seems like they’re nowhere to be found. How are you all coping with this unexpected cold spell? Any tips for embracing the cooler temperatures while still enjoying summer activities?', 'user_2ivJ5W6Y7hWCY8MElnBkH28DyFz'),
('The cold side of the pillow is the best side of the pillow', 'All those who disagree are missing out. Cold side supremacy! There’s nothing better than flipping your pillow to the cool side on a warm night. It’s such a simple pleasure that makes a huge difference in comfort. Anyone else a fan of the cold side? Share your thoughts! It’s those little things that can make our day-to-day life so much more enjoyable. Let’s celebrate the small joys!', 'user_2ivKM9QcB1Cu64lAxWXd6VpenLt'),
('Rainy Days', 'I love the sound of rain against the window. It is so soothing. There’s something incredibly calming about listening to the raindrops as they create a rhythmic melody. It’s the perfect backdrop for a cozy day indoors with a good book or a movie. Does anyone else find rain comforting? What do you like to do on rainy days? Let’s share our favorite rainy day activities and experiences!', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA'),
('Best Coffee in Town', 'Can anyone recommend a good coffee shop? I’m on the hunt for a place that serves great coffee and has a nice atmosphere. Whether it’s for a quick morning pick-me-up or a place to relax and work for a while, I’d love to hear your suggestions. What makes your favorite coffee shop special? Is it the quality of the coffee, the ambiance, the friendly staff? Let’s exchange recommendations and discover some new favorite spots!', 'user_2ivJ5W6Y7hWCY8MElnBkH28DyFz'),
('Favourite Book Recs', 'Looking for something new to read. Suggestions? I’ve just finished my latest book and I’m in need of a new literary adventure. What are some of your all-time favorite books? I’m open to any genre, as long as it’s a great read. Share your top picks and let’s discuss why they resonated with you. There’s nothing like getting lost in a good book, and I’m excited to dive into some new stories.', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA'),
('Morning Jog', 'Just completed a 5k run. Feeling great! There’s nothing like starting the day with some exercise to boost your energy and mood. I’m really proud of myself for sticking to my routine and hitting this milestone. How do you all stay active? Do you have any favorite workout routines or tips for staying motivated? Let’s share our fitness journeys and encourage each other to stay healthy and active.', 'user_2ivKM9QcB1Cu64lAxWXd6VpenLt'),
('Tech Gadgets', 'What are the latest must-have tech gadgets? I’m a bit of a tech enthusiast and love staying updated with the latest innovations. Whether it’s for productivity, entertainment, or just fun, I’d love to hear about any cool gadgets you’ve come across. What’s been a game-changer for you? Let’s discuss the best new tech and how it’s made our lives easier or more enjoyable.', 'user_2ivJ5W6Y7hWCY8MElnBkH28DyFz'),
('Baking Tips', 'How do you get the perfect crust on a pie? I’ve been experimenting with my baking skills and pies are my latest challenge. The filling is usually great, but I struggle with getting that perfect, flaky crust. What are your secrets for a foolproof pie crust? Any tips or recipes would be greatly appreciated. Let’s share our baking experiences and help each other create delicious pies!', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA'),
('Travel Plans', 'Planning a trip to Japan. Any travel tips? I’m so excited for this adventure and want to make the most of it. From must-see attractions to hidden gems, I’d love to hear your recommendations. What are some experiences I shouldn’t miss? Also, any tips on navigating and making the trip smoother would be amazing. Let’s share our travel wisdom and help each other have unforgettable journeys.', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA'),
('Favourite Films', 'What are your all-time favorite films? I’m in the mood for a movie marathon and would love to hear your top picks. Whether it’s a classic, a hidden gem, or a blockbuster, share the films that have left a lasting impression on you. Let’s discuss what makes them special and why they’re worth watching. I’m always on the lookout for great recommendations to add to my watchlist.', 'user_2ivJ5W6Y7hWCY8MElnBkH28DyFz'),
('Gardening', 'Just planted some tomatoes in my garden. Cannot wait for them to grow! Gardening has become my new favorite hobby and I’m so excited to see the results of my efforts. Do you have any tips for growing healthy tomatoes or any other gardening advice? Let’s share our gardening experiences and successes. There’s something so rewarding about growing your own plants and watching them thrive.', 'user_2ivKM9QcB1Cu64lAxWXd6VpenLt'),
('Workout Routines', 'What are your favorite workout routines? I’m looking to mix up my fitness regimen and would love some new ideas. Whether it’s strength training, cardio, yoga, or something else, share what works best for you. Staying active is so important for our overall well-being, and I’m always eager to try new exercises. Let’s motivate each other to stay fit and healthy with our favorite routines.', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA'),
('Cooking Tips', 'How do you make the perfect scrambled eggs? I’m trying to improve my cooking skills and scrambled eggs seem simple but can be tricky to get just right. What are your secrets for achieving that perfect texture and flavor? Any special ingredients or techniques you swear by? Let’s share our culinary tips and help each other become better cooks. I’m excited to learn from you all!', 'user_2ivJ5W6Y7hWCY8MElnBkH28DyFz'),
('Photography', 'Looking for a new camera. Any suggestions? I’m passionate about photography and want to upgrade my equipment. Whether it’s for landscapes, portraits, or action shots, I’d love to hear your recommendations. What cameras have you used and loved? Let’s discuss the best options out there and what makes them great. I’m excited to take my photography to the next level with your help.', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA'),
('Weekend Plans', 'What are you all up to this weekend? I’m looking for some inspiration for fun activities or relaxing plans. Whether you’re staying in or going out, share what you’ve got planned. Sometimes, hearing about others’ plans can spark some great ideas for our own weekends. Let’s discuss and maybe even plan something together. What’s everyone excited about for the upcoming weekend?', 'user_2ivKM9QcB1Cu64lAxWXd6VpenLt'),
('Music Recs', 'Looking for some new music to listen to. Any recommendations? My playlist is in need of some fresh tunes, and I’d love to hear what you’re all listening to. Whether it’s a new release, an old favorite, or something completely different, share your top picks. Music has such a powerful way of connecting us, and I’m excited to discover new artists and songs through your suggestions.', 'user_2ivJ5W6Y7hWCY8MElnBkH28DyFz'),
('Dog Training', 'How do you get a dog to stop barking? I’m having some trouble with my pup’s barking and could use some advice. What training techniques have worked for you? I’m looking for effective methods to help calm my dog and reduce the barking. Let’s share our experiences and tips to create a more peaceful environment for both our pets and ourselves. Thanks in advance for your help!', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA'),
('Study Tips', 'Best ways to stay focused while studying? I’m trying to improve my study habits and would love some advice on how to maintain concentration and productivity. What strategies have worked for you? Whether it’s creating a study schedule, finding the right environment, or using specific techniques, I’m eager to learn from your experiences. Let’s share our tips and help each other succeed in our studies.', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA'),
('Healthy Eating', 'What are some good healthy eating recipes? I’m looking to improve my diet and would love to try some new, nutritious recipes. What are your go-to healthy meals? Share your favorite recipes and any tips for maintaining a balanced diet. Eating well is so important for our overall health, and I’m excited to discover new dishes that are both delicious and good for us. Let’s get cooking!', 'user_2ivKM9QcB1Cu64lAxWXd6VpenLt'),
('DIY Projects', 'Looking for some fun DIY project ideas. I love getting creative and working on new projects at home. What are some of your favorite DIY activities? Whether it’s crafts, home improvement, or something else, I’d love to hear your suggestions. Let’s share our project ideas and inspire each other to get crafty and make something amazing. I’m excited to see what we can create!', 'user_2ivJ5W6Y7hWCY8MElnBkH28DyFz'),
('Film Night', 'What are some good films to watch on a Friday night? I’m planning a cozy movie night and need some recommendations. What are your go-to films for a relaxing evening in? Whether it’s a comedy, a thriller, or a classic, share your favorites. Let’s put together a list of must-watch movies that are perfect for winding down at the end of the week. Looking forward to your suggestions!', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA'),
('Skincare Routine', 'What are your go-to skincare products? I’m looking to update my skincare routine and would love some recommendations. What products do you swear by for keeping your skin healthy and glowing? Let’s discuss our favorite skincare items and any tips for maintaining a great routine. I’m excited to hear about what works for you and maybe find some new favorites to try.', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA');


-- SEED TABLE: COMMENTS
INSERT INTO wk09_comments (post_id, user_id, content) VALUES
('1', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit tortor eget turpis consectetur vulputate. Sed nisl nisi, fringilla venenatis neque non, euismod aliquam elit. Nulla in hendrerit quam, at consequat ante. Maecenas quis lectus pulvinar tortor sollicitudin eleifend. Aliquam faucibus molestie nunc quis vehicula. Vivamus mattis eu lorem lobortis sodales. Donec eget enim sed erat egestas gravida. Cras dignissim tincidunt tellus, fermentum interdum dui venenatis ut. Cras suscipit posuere convallis. In bibendum, orci quis consequat mattis, lacus massa accumsan nisl, quis maximus metus magna sed ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent tempus augue nec posuere feugiat. Curabitur fermentum mauris a sagittis cursus. Nullam varius fermentum augue, at dignissim tellus laoreet vel. Fusce pulvinar hendrerit lorem ac imperdiet.'),
('1', 'user_2ivJ5W6Y7hWCY8MElnBkH28DyFz', 'Welcome to Converso, everyone! Enjoy your stay!'),
('1', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA', 'Thanks, John!'),
('1', 'user_2ivJ5W6Y7hWCY8MElnBkH28DyFz', 'So how is everyone doing?'),
('1', 'user_2ivL1p1jN8EMTsM7GuAi8ewdyMA', 'Good, thanks!'),
('27', 'user_2ivKM9QcB1Cu64lAxWXd6VpenLt', 'Try La Roche Posay!'),
('27', 'user_2ivKM9QcB1Cu64lAxWXd6VpenLt', 'Avene are great, too!');