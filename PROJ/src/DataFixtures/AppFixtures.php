<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private UserPasswordEncoderInterface $userPasswordEncoder;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordEncoderInterface $userPasswordEncoder)
    {
        $this->entityManager = $entityManager;
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    public function load(ObjectManager $manager)
    {
         $user = new User();
         $user->setFirstName('Admin');
         $user->setLastName('User');
         $user->setEmail('admin@example.com');
         $user->setRoles(['ROLE_USER', 'ROLE_ADMIN']);
         $user->setContactNumber('0426456456');
         $user->setWagePerHour(80.00);
         $user->setProfilePicture('https://i.pinimg.com/originals/77/21/ea/7721ea3e88628ae311a71456c49300ce.png');
         $password = $this->userPasswordEncoder->encodePassword($user, 'password');
         $user->setPassword($password);
         $manager->persist($user);

        $manager->flush();
    }
}
