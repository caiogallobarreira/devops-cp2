CREATE TABLE `dimdim`.`tb_funcionarios` (
  `funcionario_id` INT NOT NULL AUTO_INCREMENT,
  `nome_completo` VARCHAR(45) NOT NULL,
  `endereco` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`funcionario_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

INSERT INTO `dimdim`.`tb_funcionarios` (`funcionario_id`, `nome_completo`, `endereco`, `email`, `cpf`) VALUES (1, 'Caio Gallo Barreira', 'Rua da Minha Casa, 611 - Sao Paulo, SP', 'caio@gmail.com', '00000000000');
INSERT INTO `dimdim`.`tb_funcionarios` (`funcionario_id`, `nome_completo`, `endereco`, `email`, `cpf`) VALUES (2, 'Guilherme Menezes da Silva', 'Rua da Vossa Casa, 231 - Sao Paulo, SP', 'gui_menezes@gmail.com', '00000000001');
INSERT INTO `dimdim`.`tb_funcionarios` (`funcionario_id`, `nome_completo`, `endereco`, `email`, `cpf`) VALUES (3, 'Guilherme Oliveira Rocha', 'Rua Grande, 1023 - Sao Paulo, SP', 'gui_rocha@gmail.com', '00000000002');
INSERT INTO `dimdim`.`tb_funcionarios` (`funcionario_id`, `nome_completo`, `endereco`, `email`, `cpf`) VALUES (4, 'Joao Victor de Silva Souza', 'Rua Pequena, 2 - Sao Paulo, SP', 'joao@gmail.com', '00000000003');