INSERT INTO `gender` (`id`, `title`) VALUES (NULL, 'hommes'), (NULL, 'femmes'), (NULL, 'enfants'), (NULL, 'bébés');

INSERT INTO `category` (`id`, `title`) VALUES (NULL, 'pantalons'), (NULL, 't-shirts'), (NULL, 'pulls'), (NULL, 'chaussures'), (NULL, 'sous-vetements'), (NULL, 'accessoires');

INSERT INTO `product` (`id`, `title`, `description`, `image`, `price`, `gender_id`, `category_id`) VALUES (NULL, 'pantalon1', 'blabla', 'product-01.jpg', '15.00', '1', '3');

INSERT INTO `app_user` (`id`, `email`, `password`, `is_active`, `role`) VALUES (NULL, 'admin@admin.fr', '$2b$10$vN.h1c8upt4Y.inpMPT.LuNMl4tF7.MB3AqnK5mahslUmBs8Wj/f.', NULL, 'Admin'),(NULL, 'user@user.fr', '$2b$10$YOCwJTqhkRnm5Un1kXgc1uO7wvoTo//b6G5Kqi9gsBBfnHwnm/jAe', NULL, 'User');