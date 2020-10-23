<?php

namespace App\DataFixtures;

use App\Entity\ScheduledShift;
use App\Entity\ShiftComments;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
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

    /**  Admin User with Shifts */
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

    $start = new Datetime('2020-11-16 02:00:00');
    $end = new Datetime('2020-11-16 10:00:00');

    $shift = new ScheduledShift();
    $shift->setShiftStatus('primary');
    $shift->setOnDuty($user);
    $shift->setIsApproved(false);
    $shift->setStart($start);
    $shift->setEnd($end);
    $manager->persist($shift);

    $start2 = new Datetime('2020-11-12 00:00:00');
    $end2 = new Datetime('2020-11-12 08:00:00');

    $shift2 = new ScheduledShift();
    $shift2->setShiftStatus('secondary');
    $shift2->setOnDuty($user);
    $shift2->setIsApproved(false);
    $shift2->setStart($start2);
    $shift2->setEnd($end2);
    $manager->persist($shift2);


    $start3 = new Datetime('2020-11-15 05:00:00');
    $end3 = new Datetime('2020-11-15 12:00:00');

    $shift3 = new ScheduledShift();
    $shift3->setShiftStatus('primary');
    $shift3->setOnDuty($user);
    $shift3->setIsApproved(true);
    $shift3->setStart($start3);
    $shift3->setEnd($end3);
    $manager->persist($shift3);

    $start4 = new Datetime('2020-11-18 03:00:00');
    $end4 = new Datetime('2020-11-18 08:00:00');

    $shift4 = new ScheduledShift();
    $shift4->setShiftStatus('secondary');
    $shift4->setOnDuty($user);
    $shift4->setIsApproved(true);
    $shift4->setStart($start4);
    $shift4->setEnd($end4);
    $manager->persist($shift4);

    $start5 = new Datetime('2020-11-30 01:00:00');
    $end5 = new Datetime('2020-11-30 08:00:00');

    $shift5 = new ScheduledShift();
    $shift5->setShiftStatus('primary');
    $shift5->setOnDuty($user);
    $shift5->setIsApproved(false);
    $shift5->setStart($start5);
    $shift5->setEnd($end5);
    $manager->persist($shift5);

    $start5 = new Datetime('2020-12-01 02:00:00');
    $end5 = new Datetime('2020-12-01 06:00:00');

    $shift5 = new ScheduledShift();
    $shift5->setShiftStatus('secondary');
    $shift5->setOnDuty($user);
    $shift5->setIsApproved(true);
    $shift5->setStart($start5);
    $shift5->setEnd($end5);
    $manager->persist($shift5);

    $start6 = new Datetime('2020-11-23 01:00:00');
    $end6 = new Datetime('2020-11-23 08:00:00');

    $shift6 = new ScheduledShift();
    $shift6->setShiftStatus('secondary');
    $shift6->setOnDuty($user);
    $shift6->setIsApproved(true);
    $shift6->setStart($start6);
    $shift6->setEnd($end6);
    $manager->persist($shift6);



    /**  Leonardo Da Vinci with Shifts */

    $user2 = new User();
    $user2->setFirstName('Leonardo');
    $user2->setLastName('Da Vinci');
    $user2->setEmail('leo@example.com');
    $user2->setRoles(['ROLE_USER']);
    $user2->setContactNumber('0426854542');
    $user2->setWagePerHour(60.00);
    $user2->setProfilePicture('https://i.pinimg.com/originals/54/fd/94/54fd9457e4227cb4fbb5e97fbd0811c7.jpg');
    $password = $this->userPasswordEncoder->encodePassword($user2, 'password');
    $user2->setPassword($password);
    $manager->persist($user2);

    $start = new Datetime('2020-11-11 00:00:00');
    $end = new Datetime('2020-11-11 07:00:00');

    $shift7 = new ScheduledShift();
    $shift7->setShiftStatus('primary');
    $shift7->setOnDuty($user2);
    $shift7->setIsApproved(false);
    $shift7->setStart($start);
    $shift7->setEnd($end);
    $manager->persist($shift7);

    $start2 = new Datetime('2020-11-12 02:00:00');
    $end2 = new Datetime('2020-11-12 08:00:00');

    $shift8 = new ScheduledShift();
    $shift8->setShiftStatus('secondary');
    $shift8->setOnDuty($user2);
    $shift8->setIsApproved(false);
    $shift8->setStart($start2);
    $shift8->setEnd($end2);
    $manager->persist($shift8);


    $start3 = new Datetime('2020-11-15 02:00:00');
    $end3 = new Datetime('2020-11-15 07:00:00');

    $shift9 = new ScheduledShift();
    $shift9->setShiftStatus('primary');
    $shift9->setOnDuty($user2);
    $shift9->setIsApproved(true);
    $shift9->setStart($start3);
    $shift9->setEnd($end3);
    $manager->persist($shift9);

    $start4 = new Datetime('2020-11-18 01:00:00');
    $end4 = new Datetime('2020-11-18 08:00:00');

    $shift10 = new ScheduledShift();
    $shift10->setShiftStatus('secondary');
    $shift10->setOnDuty($user2);
    $shift10->setIsApproved(true);
    $shift10->setStart($start4);
    $shift10->setEnd($end4);
    $manager->persist($shift10);

    $start5 = new Datetime('2020-12-18 02:00:00');
    $end5 = new Datetime('2020-12-18 08:00:00');

    $shift11 = new ScheduledShift();
    $shift11->setShiftStatus('primary');
    $shift11->setOnDuty($user2);
    $shift11->setIsApproved(false);
    $shift11->setStart($start5);
    $shift11->setEnd($end5);
    $manager->persist($shift11);

    $start5 = new Datetime('2020-11-20 03:00:00');
    $end5 = new Datetime('2020-11-20 09:00:00');

    $shift12 = new ScheduledShift();
    $shift12->setShiftStatus('secondary');
    $shift12->setOnDuty($user2);
    $shift12->setIsApproved(true);
    $shift12->setStart($start5);
    $shift12->setEnd($end5);
    $manager->persist($shift12);

    $start6 = new Datetime('2020-11-23 04:00:00');
    $end6 = new Datetime('2020-11-23 08:00:00');

    $shift13 = new ScheduledShift();
    $shift13->setShiftStatus('secondary');
    $shift13->setOnDuty($user2);
    $shift13->setIsApproved(true);
    $shift13->setStart($start6);
    $shift13->setEnd($end6);
    $manager->persist($shift13);

    /** Bob Ross with Shifts */

    $user3 = new User();
    $user3->setFirstName('Bob');
    $user3->setLastName('Ross');
    $user3->setEmail('bob@example.com');
    $user3->setRoles(['ROLE_USER']);
    $user3->setContactNumber('0452354814');
    $user3->setWagePerHour(60.00);
    $user3->setProfilePicture('https://i.pinimg.com/originals/25/3c/fa/253cfa198f67470e7b3c9d34ede4d84c.jpg');
    $password = $this->userPasswordEncoder->encodePassword($user3, 'password');
    $user3->setPassword($password);
    $manager->persist($user3);

    $start = new Datetime('2020-12-09 02:00:00');
    $end = new Datetime('2020-12-09 10:00:00');

    $shift14 = new ScheduledShift();
    $shift14->setShiftStatus('primary');
    $shift14->setOnDuty($user3);
    $shift14->setIsApproved(false);
    $shift14->setStart($start);
    $shift14->setEnd($end);
    $manager->persist($shift14);

    $start2 = new Datetime('2020-12-21 02:00:00');
    $end2 = new Datetime('2020-12-21 10:00:00');

    $shift15 = new ScheduledShift();
    $shift15->setShiftStatus('secondary');
    $shift15->setOnDuty($user3);
    $shift15->setIsApproved(false);
    $shift15->setStart($start2);
    $shift15->setEnd($end2);
    $manager->persist($shift15);


    $start3 = new Datetime('2020-11-15 02:00:00');
    $end3 = new Datetime('2020-11-15 10:00:00');

    $shift16 = new ScheduledShift();
    $shift16->setShiftStatus('primary');
    $shift16->setOnDuty($user3);
    $shift16->setIsApproved(true);
    $shift16->setStart($start3);
    $shift16->setEnd($end3);
    $manager->persist($shift16);

    $start4 = new Datetime('2020-12-13 02:00:00');
    $end4 = new Datetime('2020-12-13 10:00:00');

    $shift17 = new ScheduledShift();
    $shift17->setShiftStatus('secondary');
    $shift17->setOnDuty($user3);
    $shift17->setIsApproved(true);
    $shift17->setStart($start4);
    $shift17->setEnd($end4);
    $manager->persist($shift17);

    $start5 = new Datetime('2020-12-02 02:00:00');
    $end5 = new Datetime('2020-12-02 10:00:00');

    $shift18 = new ScheduledShift();
    $shift18->setShiftStatus('primary');
    $shift18->setOnDuty($user3);
    $shift18->setIsApproved(false);
    $shift18->setStart($start5);
    $shift18->setEnd($end5);
    $manager->persist($shift18);

    $start5 = new Datetime('2020-12-10 02:00:00');
    $end5 = new Datetime('2020-12-10 10:00:00');

    $shift19 = new ScheduledShift();
    $shift19->setShiftStatus('secondary');
    $shift19->setOnDuty($user3);
    $shift19->setIsApproved(true);
    $shift19->setStart($start5);
    $shift19->setEnd($end5);
    $manager->persist($shift19);

    $start6 = new Datetime('2020-11-23 02:00:00');
    $end6 = new Datetime('2020-11-23 10:00:00');

    $shift20 = new ScheduledShift();
    $shift20->setShiftStatus('secondary');
    $shift20->setOnDuty($user3);
    $shift20->setIsApproved(true);
    $shift20->setStart($start6);
    $shift20->setEnd($end6);
    $manager->persist($shift20);


    $user4 = new User();
    $user4->setFirstName('Vincent Van');
    $user4->setLastName('Gogh');
    $user4->setEmail('vinny@example.com');
    $user4->setRoles(['ROLE_USER']);
    $user4->setContactNumber('0451215158');
    $user4->setWagePerHour(60.00);
    $user4->setProfilePicture('https://i.pinimg.com/originals/37/f2/bf/37f2bf555beed8d4b7882e65382091c0.jpg');
    $password = $this->userPasswordEncoder->encodePassword($user4, 'password');
    $user4->setPassword($password);
    $manager->persist($user4);

    $start3 = new Datetime('2021-01-15 00:00:00');
    $end3 = new Datetime('2021-01-15 07:00:00');

    $shift21 = new ScheduledShift();
    $shift21->setShiftStatus('primary');
    $shift21->setOnDuty($user3);
    $shift21->setIsApproved(true);
    $shift21->setStart($start3);
    $shift21->setEnd($end3);
    $manager->persist($shift21);

    $start4 = new Datetime('2020-11-27 00:00:00');
    $end4 = new Datetime('2020-11-27 07:00:00');

    $shift22 = new ScheduledShift();
    $shift22->setShiftStatus('secondary');
    $shift22->setOnDuty($user3);
    $shift22->setIsApproved(true);
    $shift22->setStart($start4);
    $shift22->setEnd($end4);
    $manager->persist($shift22);

    $start5 = new Datetime('2020-12-04 00:00:00');
    $end5 = new Datetime('2020-12-04 07:00:00');

    $shift23 = new ScheduledShift();
    $shift23->setShiftStatus('primary');
    $shift23->setOnDuty($user3);
    $shift23->setIsApproved(false);
    $shift23->setStart($start5);
    $shift23->setEnd($end5);
    $manager->persist($shift23);

    $start5 = new Datetime('2020-12-25 00:00:00');
    $end5 = new Datetime('2020-12-25 07:00:00');

    $shift24 = new ScheduledShift();
    $shift24->setShiftStatus('secondary');
    $shift24->setOnDuty($user3);
    $shift24->setIsApproved(true);
    $shift24->setStart($start5);
    $shift24->setEnd($end5);
    $manager->persist($shift24);

    $start6 = new Datetime('2020-11-23 00:00:00');
    $end6 = new Datetime('2020-11-23 07:00:00');

    $shift25 = new ScheduledShift();
    $shift25->setShiftStatus('secondary');
    $shift25->setOnDuty($user3);
    $shift25->setIsApproved(true);
    $shift25->setStart($start6);
    $shift25->setEnd($end6);
    $manager->persist($shift25);

    /** Georgia O'Keeffe and shifts */

    $user5 = new User();
    $user5->setFirstName('Georgia');
    $user5->setLastName("O'Keeffe");
    $user5->setEmail('georgy@example.com');
    $user5->setRoles(['ROLE_USER']);
    $user5->setContactNumber('0452151518');
    $user5->setWagePerHour(60.00);
    $user5->setProfilePicture('https://i.pinimg.com/originals/40/fe/95/40fe95c1acb26e935ae2c95504967a5f.png');
    $password = $this->userPasswordEncoder->encodePassword($user5, 'password');
    $user5->setPassword($password);
    $manager->persist($user5);

    $start = new Datetime('2020-11-11 02:00:00');
    $end = new Datetime('2020-11-11 09:00:00');

    $shift26 = new ScheduledShift();
    $shift26->setShiftStatus('primary');
    $shift26->setOnDuty($user5);
    $shift26->setIsApproved(false);
    $shift26->setStart($start);
    $shift26->setEnd($end);
    $manager->persist($shift26);

    $start2 = new Datetime('2020-12-12 01:00:00');
    $end2 = new Datetime('2020-12-12 09:00:00');

    $shift27 = new ScheduledShift();
    $shift27->setShiftStatus('secondary');
    $shift27->setOnDuty($user5);
    $shift27->setIsApproved(false);
    $shift27->setStart($start2);
    $shift27->setEnd($end2);
    $manager->persist($shift27);


    $start3 = new Datetime('2020-12-28 02:00:00');
    $end3 = new Datetime('2020-12-28 08:00:00');

    $shift28 = new ScheduledShift();
    $shift28->setShiftStatus('primary');
    $shift28->setOnDuty($user5);
    $shift28->setIsApproved(true);
    $shift28->setStart($start3);
    $shift28->setEnd($end3);
    $manager->persist($shift28);

    $start4 = new Datetime('2020-12-09 03:00:00');
    $end4 = new Datetime('2020-12-09 10:00:00');

    $shift29 = new ScheduledShift();
    $shift29->setShiftStatus('secondary');
    $shift29->setOnDuty($user5);
    $shift29->setIsApproved(true);
    $shift29->setStart($start4);
    $shift29->setEnd($end4);
    $manager->persist($shift29);

    $start5 = new Datetime('2020-11-17 02:00:00');
    $end5 = new Datetime('2020-11-17 08:00:00');

    $shift30 = new ScheduledShift();
    $shift30->setShiftStatus('primary');
    $shift30->setOnDuty($user5);
    $shift30->setIsApproved(false);
    $shift30->setStart($start5);
    $shift30->setEnd($end5);
    $manager->persist($shift30);

    $start5 = new Datetime('2020-12-18 01:00:00');
    $end5 = new Datetime('2020-12-18 07:00:00');

    $shift31 = new ScheduledShift();
    $shift31->setShiftStatus('secondary');
    $shift31->setOnDuty($user5);
    $shift31->setIsApproved(true);
    $shift31->setStart($start5);
    $shift31->setEnd($end5);
    $manager->persist($shift31);

    $start6 = new Datetime('2020-12-10 02:00:00');
    $end6 = new Datetime('2020-12-10 09:00:00');

    $shift32 = new ScheduledShift();
    $shift32->setShiftStatus('secondary');
    $shift32->setOnDuty($user5);
    $shift32->setIsApproved(true);
    $shift32->setStart($start6);
    $shift32->setEnd($end6);
    $manager->persist($shift32);

    /** Mary Cassatt and shifts */

    $user6 = new User();
    $user6->setFirstName('Mary');
    $user6->setLastName("Cassatt");
    $user6->setEmail('mary@example.com');
    $user6->setRoles(['ROLE_USER']);
    $user6->setContactNumber('0456985652');
    $user6->setWagePerHour(60.00);
    $user6->setProfilePicture('https://i.pinimg.com/originals/cc/69/e4/cc69e416a52a1a2e5dc9839e3d3ef8bd.jpg');
    $password = $this->userPasswordEncoder->encodePassword($user6, 'password');
    $user6->setPassword($password);
    $manager->persist($user6);

    $start = new Datetime('2020-12-05 00:00:00');
    $end = new Datetime('2020-12-05 07:00:00');

    $shift36 = new ScheduledShift();
    $shift36->setShiftStatus('primary');
    $shift36->setOnDuty($user6);
    $shift36->setIsApproved(false);
    $shift36->setStart($start);
    $shift36->setEnd($end);
    $manager->persist($shift36);

    $start2 = new Datetime('2020-11-12 00:00:00');
    $end2 = new Datetime('2020-11-12 18:00:00');

    $shift37 = new ScheduledShift();
    $shift37->setShiftStatus('secondary');
    $shift37->setOnDuty($user6);
    $shift37->setIsApproved(false);
    $shift37->setStart($start2);
    $shift37->setEnd($end2);
    $manager->persist($shift37);


    $start3 = new Datetime('2020-11-07 01:30:00');
    $end3 = new Datetime('2020-11-07 08:30:00');

    $shift38 = new ScheduledShift();
    $shift38->setShiftStatus('primary');
    $shift38->setOnDuty($user6);
    $shift38->setIsApproved(true);
    $shift38->setStart($start3);
    $shift38->setEnd($end3);
    $manager->persist($shift38);

    $start4 = new Datetime('2020-11-05 05:00:00');
    $end4 = new Datetime('2020-11-05 10:30:00');

    $shift39 = new ScheduledShift();
    $shift39->setShiftStatus('secondary');
    $shift39->setOnDuty($user6);
    $shift39->setIsApproved(true);
    $shift39->setStart($start4);
    $shift39->setEnd($end4);
    $manager->persist($shift39);

    $start5 = new Datetime('2020-11-10 01:30:00');
    $end5 = new Datetime('2020-11-10 08:00:00');

    $shift40 = new ScheduledShift();
    $shift40->setShiftStatus('primary');
    $shift40->setOnDuty($user6);
    $shift40->setIsApproved(false);
    $shift40->setStart($start5);
    $shift40->setEnd($end5);
    $manager->persist($shift40);

    $start5 = new Datetime('2020-11-23 02:00:00');
    $end5 = new Datetime('2020-11-23 09:30:00');

    $shift41 = new ScheduledShift();
    $shift41->setShiftStatus('secondary');
    $shift41->setOnDuty($user6);
    $shift41->setIsApproved(true);
    $shift41->setStart($start5);
    $shift41->setEnd($end5);
    $manager->persist($shift41);

    $start6 = new Datetime('2020-11-25 02:30:00');
    $end6 = new Datetime('2020-11-25 08:45:00');

    $shift42 = new ScheduledShift();
    $shift42->setShiftStatus('secondary');
    $shift42->setOnDuty($user6);
    $shift42->setIsApproved(true);
    $shift42->setStart($start6);
    $shift42->setEnd($end6);
    $manager->persist($shift42);

    $comment = new ShiftComments();
    $comment->setSubject('Swap Shifts?');
    $comment->setAuthoredBy($user);
    $comment->setRecipient($user2);
    $comment->setMarkedAsRead(false);
    $comment->setComment('Hey are you keen to swap shifts next week?');
    $comment->setIsPrivate(true);
    $comment->setDateOfComment($end);
    $comment->setShift($shift3);
    $manager->persist($comment);

    $comment2 = new ShiftComments();
    $comment2->setSubject('Im a vegan');
    $comment2->setAuthoredBy($user2);
    $comment2->setRecipient($user);
    $comment2->setMarkedAsRead(false);
    $comment2->setComment('Hi, I just wanted to message you and tell you that I am a vegan.');
    $comment2->setIsPrivate(true);
    $comment2->setDateOfComment($end);
    $comment2->setShift($shift20);
    $manager->persist($comment2);

    $comment3 = new ShiftComments();
    $comment3->setSubject('What is this music?');
    $comment3->setAuthoredBy($user5);
    $comment3->setRecipient($user);
    $comment3->setMarkedAsRead(false);
    $comment3->setComment('There is only so much Achy Breaky Heart that I can handle. Please organise a new playlist!');
    $comment3->setIsPrivate(true);
    $comment3->setDateOfComment($end);
    $comment3->setShift($shift4);
    $manager->persist($comment3);

    $comment4 = new ShiftComments();
    $comment4->setSubject('AirCon Broke');
    $comment4->setAuthoredBy($user4);
    $comment4->setRecipient($user);
    $comment4->setMarkedAsRead(false);
    $comment4->setComment('I am so sweaty! please fix the A/C');
    $comment4->setIsPrivate(true);
    $comment4->setDateOfComment($end);
    $comment4->setShift(null);
    $manager->persist($comment4);

    $comment5 = new ShiftComments();
    $comment5->setSubject('I need a raise!');
    $comment5->setAuthoredBy($user3);
    $comment5->setRecipient($user5);
    $comment5->setMarkedAsRead(false);
    $comment5->setComment('I work so hard, I believe a raise is in order..');
    $comment5->setIsPrivate(true);
    $comment5->setDateOfComment($end);
    $comment5->setShift(null);
    $manager->persist($comment5);

    $comment6 = new ShiftComments();
    $comment6->setSubject('Bring Cake!');
    $comment6->setAuthoredBy($user6);
    $comment6->setRecipient($user2);
    $comment6->setMarkedAsRead(false);
    $comment6->setComment('If I have to work on my birthday, I expect cake!');
    $comment6->setIsPrivate(false);
    $comment6->setDateOfComment($end);
    $comment6->setShift($shift3);
    $manager->persist($comment6);

    $comment7 = new ShiftComments();
    $comment7->setSubject('Lookin Forward to it!');
    $comment7->setAuthoredBy($user6);
    $comment7->setRecipient($user);
    $comment7->setMarkedAsRead(false);
    $comment7->setComment('So super duper excited for this shift! Should be AMAZING!!!');
    $comment7->setIsPrivate(true);
    $comment7->setDateOfComment($end);
    $comment7->setShift($shift7);
    $manager->persist($comment7);

    $comment8 = new ShiftComments();
    $comment8->setSubject('Bit long!');
    $comment8->setAuthoredBy($user4);
    $comment8->setRecipient($user2);
    $comment8->setMarkedAsRead(false);
    $comment8->setComment('This is a bit long yeh?');
    $comment8->setIsPrivate(false);
    $comment8->setDateOfComment($end);
    $comment8->setShift($shift12);
    $manager->persist($comment8);

    $comment9 = new ShiftComments();
    $comment9->setSubject('Milk is gone!');
    $comment9->setAuthoredBy($user3);
    $comment9->setRecipient($user4);
    $comment9->setMarkedAsRead(false);
    $comment9->setComment('Someone drank all the milk but left all the cookies..');
    $comment9->setIsPrivate(false);
    $comment9->setDateOfComment($end);
    $comment9->setShift($shift3);
    $manager->persist($comment9);

    $manager->flush();
  }
}
