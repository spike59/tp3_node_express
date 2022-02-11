INSERT INTO `gender` (`id`, `title`) VALUES (NULL, 'hommes'), (NULL, 'femmes'), (NULL, 'enfants'), (NULL, 'bébés');

INSERT INTO `category` (`id`, `title`) VALUES (NULL, 'pantalons'), (NULL, 't-shirts'), (NULL, 'pulls'), (NULL, 'chaussures'), (NULL, 'sous-vetements'), (NULL, 'accessoires');

INSERT INTO `product` (`id`, `title`, `description`, `image`, `price`, `gender_id`, `category_id`) VALUES (NULL, 'pantalon1', 'blabla', 'product-01.jpg', '15.00', '1', '3');
