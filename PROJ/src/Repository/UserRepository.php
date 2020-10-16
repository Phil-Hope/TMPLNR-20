<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Mapping;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bridge\Doctrine\Security\User\UserLoaderInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use App\Entity\User;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements UserLoaderInterface
{

  public function __construct(ManagerRegistry $registry)
  {
    parent::__construct($registry, User::class);
  }

  /**
   * @param $username
   * @return User
   */
  public function findUserByUsername($username)
  {
    return $this->findOneBy(array(
      'username' => $username
    ));
  }

  /**
   * @param $email
   * @return User
   */
  public function findUserByEmail($email)
  {
    return $this->findOneBy(array(
      'email' => $email
    ));
  }

  /**
   * @return User
   * @throws NonUniqueResultException
   */
  public function findAny()
  {
    return $this->createQueryBuilder('u')
      ->setMaxResults(1)
      ->getQuery()
      ->getOneOrNullResult();
  }

  public function loadUserByUsername($username)
  {
    $user = $this->findUserByUsername($username);

    // allow login by email too
    if (!$user) {
      $user = $this->findUserByEmail($username);
    }

    if (!$user) {
      throw new UsernameNotFoundException(sprintf('Email "%s" does not exist.', $username));
    }

    return $user;
  }
}
