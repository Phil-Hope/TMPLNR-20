<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201008203917 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ADD TABLE scheduled_shift DROP FOREIGN KEY scheduled_shift_user_id_fk');
        $this->addSql('DROP INDEX scheduled_shift_id_uindex ON scheduled_shift');
        $this->addSql('ALTER TABLE scheduled_shift CHANGE on_duty_id on_duty_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', CHANGE shift_status shift_status VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE scheduled_shift ADD CONSTRAINT FK_E776626E7CB2CD68 FOREIGN KEY (on_duty_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE scheduled_shift RENAME INDEX scheduled_shift_user_id_fk TO IDX_E776626E7CB2CD68');
        $this->addSql('ALTER TABLE shift_comments DROP FOREIGN KEY shift_comments_scheduled_shift_id_fk');
        $this->addSql('ALTER TABLE shift_comments DROP FOREIGN KEY shift_comments_user_id_fk_2');
        $this->addSql('DROP INDEX shift_comments_id_uindex ON shift_comments');
        $this->addSql('ALTER TABLE shift_comments CHANGE shift_id shift_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', CHANGE authored_by_id authored_by_id VARCHAR(255) NOT NULL, ADD PRIMARY KEY (id)');
        $this->addSql('ALTER TABLE shift_comments ADD CONSTRAINT FK_762A0E8EBB70BC0E FOREIGN KEY (shift_id) REFERENCES scheduled_shift (id)');
        $this->addSql('ALTER TABLE shift_comments RENAME INDEX shift_comments_user_id_fk_2 TO IDX_762A0E8E22BF0A45');
        $this->addSql('ALTER TABLE shift_comments RENAME INDEX shift_comments_scheduled_shift_id_fk TO IDX_762A0E8EBB70BC0E');
        $this->addSql('DROP INDEX user_id_uindex ON user');
        $this->addSql('ALTER TABLE user CHANGE roles roles JSON NOT NULL, CHANGE contact_number contact_number VARCHAR(15) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE scheduled_shift DROP FOREIGN KEY FK_E776626E7CB2CD68');
        $this->addSql('ALTER TABLE scheduled_shift CHANGE on_duty_id on_duty_id CHAR(36) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:uuid)\', CHANGE shift_status shift_status TINYTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:simple_array)\'');
        $this->addSql('ALTER TABLE scheduled_shift ADD CONSTRAINT scheduled_shift_user_id_fk FOREIGN KEY (on_duty_id) REFERENCES user (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('CREATE UNIQUE INDEX scheduled_shift_id_uindex ON scheduled_shift (id)');
        $this->addSql('ALTER TABLE scheduled_shift RENAME INDEX idx_e776626e7cb2cd68 TO scheduled_shift_user_id_fk');
        $this->addSql('ALTER TABLE shift_comments DROP INDEX primary, ADD UNIQUE INDEX shift_comments_id_uindex (id)');
        $this->addSql('ALTER TABLE shift_comments DROP FOREIGN KEY FK_762A0E8EBB70BC0E');
        $this->addSql('ALTER TABLE shift_comments CHANGE shift_id shift_id CHAR(36) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:uuid)\', CHANGE authored_by_id authored_by_id CHAR(36) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE shift_comments ADD CONSTRAINT shift_comments_scheduled_shift_id_fk FOREIGN KEY (shift_id) REFERENCES scheduled_shift (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE shift_comments ADD CONSTRAINT shift_comments_user_id_fk_2 FOREIGN KEY (authored_by_id) REFERENCES user (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE shift_comments RENAME INDEX idx_762a0e8ebb70bc0e TO shift_comments_scheduled_shift_id_fk');
        $this->addSql('ALTER TABLE shift_comments RENAME INDEX idx_762a0e8e22bf0a45 TO shift_comments_user_id_fk_2');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74 ON user');
        $this->addSql('ALTER TABLE user CHANGE roles roles TEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE contact_number contact_number VARCHAR(15) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE UNIQUE INDEX user_id_uindex ON user (id)');
    }
}
