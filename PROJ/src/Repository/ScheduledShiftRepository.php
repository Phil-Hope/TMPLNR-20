<?php

namespace App\Repository;

use App\Entity\ScheduledShift;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ScheduledShift|null find($id, $lockMode = null, $lockVersion = null)
 * @method ScheduledShift|null findOneBy(array $criteria, array $orderBy = null)
 * @method ScheduledShift[]    findAll()
 * @method ScheduledShift[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ScheduledShiftRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ScheduledShift::class);
    }

    // /**
    //  * @return TestScheduledShift[] Returns an array of TestScheduledShift objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TestScheduledShift
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
