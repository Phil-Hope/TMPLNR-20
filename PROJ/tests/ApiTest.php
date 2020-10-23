<?php


namespace App\Tests;


use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\Client;
use App\Entity\ScheduledShift;
use App\Entity\ShiftComments;
use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class ApiTest extends  ApiTestCase
{
  use ReloadDatabaseTrait;

  /**
   * This is a protected
   * function used to create
   * an instance of a test user which
   * is used in some of the tests/
   *
   * @param string $email
   * @param string $password
   * @param string $contactNumber
   * @param string $wagePerHour
   * @param string $profilePicture
   * @param string $firstName
   * @param string $lastName
   * @param array $roles
   * @return User
   */
  protected function createUser(    string $email,
                                 string $password,
                                 string $contactNumber,
                                 string $wagePerHour,
                                 string $profilePicture,
                                 string $firstName,
                                 string $lastName,
                                 array $roles
): User
  {
    $user = new User();
    $user->setEmail($email);
    $user->setPassword($password);
    $user->setProfilePicture($profilePicture);
    $user->setWagePerHour($wagePerHour);
    $user->setFirstName($firstName);
    $user->setLastName($lastName);
    $user->setContactNumber($contactNumber);
    $user->setRoles($roles);

    $encoded = self::$container->get('security.password_encoder')->encodePassword($user, $password);
    $user->setPassword($encoded);

    $em = self::$container->get('doctrine')->getManager();

    $em->persist($user);
    $em->flush();

    return $user;
  }

  /**
   * This creates a "Container"
   * Which stores information that can
   * Then be called on in the applicable tests
   *
   * @return EntityManagerInterface
   */
  protected function getEntityManager(): EntityManagerInterface
  {
    return self::$container->get('doctrine')->getManager();
  }

  /**
   * This is another shortcut function
   * used to call upon in the applicable tests
   *
   * @param Client $client
   * @param string $email
   * @param string $password
   * @param UserInterface $user
   * @return Client
   * @throws TransportExceptionInterface
   */
  protected function login(Client $client, string $email, string $password, UserInterface $user)
  {

   $client->request('POST', '/login', [
      'headers' => ['Content-Type' => 'application/json'],
      'json' => [
        'email' => $email,
        'password' => $password
      ]]);

    $this->assertResponseStatusCodeSame(200);
    return $client;
  }

  /**
   * This merges the createUser and login
   * functions to create an instance of
   * registration and login. This allows for me
   * to then use the new user information in
   * the testing container.
   *
   * @param Client $client
   * @param string $email
   * @param string $password
   * @param string $contactNumber
   * @param string $wagePerHour
   * @param string $profilePicture
   * @param string $firstName
   * @param string $lastName
   * @param array $roles
   * @return User
   * @throws TransportExceptionInterface
   */
  protected function createUserAndLogin(
                                        Client $client,
                                        string $email,
                                        string $password,
                                        string $contactNumber,
                                        string $wagePerHour,
                                        string $profilePicture,
                                        string $firstName,
                                        string $lastName,
                                        array $roles)
  {
             $user = $this->createUser(
                                       $email,
                                       $password,
                                       $contactNumber,
                                       $wagePerHour,
                                       $profilePicture,
                                       $firstName,
                                       $lastName,
                                       $roles
    );
    $this->login($client, $email, $password);

    return $user;
  }


  /**
   * This to ensure that when an empty array
   * of data is sent that the applicable error message
   * is given. Should return 400 Bad Request
   */
  public function testPostEmptyUser()
  {
    $client = self::createClient();
    try {
      $client->request('POST', '/users', [
        'headers' => [
          'Content-Type' => 'application/json'
        ], 'json' => []
      ]);
    } catch (TransportExceptionInterface $e) {
    }
    $this->assertResponseStatusCodeSame(400);
  }

  /**
   * This is a GET request for a collection of users
   * from '/users' endpoint.
   *
   * @throws TransportExceptionInterface
   */
   public function testGetAllUsers()
   {
     $client = self::createClient();
     $client->request('GET', '/users', [
       'headers' => [
         'Content-Type' => 'application/json',
         'Accept' => 'application/json'
       ]
     ]);
     $this->assertResponseStatusCodeSame(200);
   }

  /**
   * This is a GET request for a collection of shifts
   * from '/shifts' endpoint.
   *
   * @throws TransportExceptionInterface
   */
   public function testGetAllShifts() {
     $client = self::createClient();
    $client->request('GET', '/shifts', [
      'headers' => [
        'Content-Type' => 'application/json',
        'Accept' => 'application/json'
      ],
    ]);
     $this->assertResponseStatusCodeSame(200);
   }

  /**
   * Probably overkill, but a single test for
   * POST to create a new user at '/users' endpoint.
   */
    public function testAddUser()
    {
      $client = self::createClient();
      try {
        $client->request('POST', '/users', [
          'headers' => [
            'Content-Type' => 'application/json'
          ],
          'json' => [
            'firstName' => 'Random',
            'lastName' => 'User',
            'contactNumber' => '0425252456',
            'profilePicture' => 'https://i.pinimg.com/originals/26/d1/9b/26d19bd36b356ebf4018f67a7afbf2db.jpg',
            'wagePerHour' => '80.00',
            'email' => 'random@email.com',
            'password' => 'password',
            'roles' => ['ROLE_USER', 'ROLE_ADMIN']
          ]
        ]);
      } catch (TransportExceptionInterface $e) {
      }
      $this->assertResponseStatusCodeSame(201);
    }

  /**
   * This is POST request to add a new shift
   * to using the '/shifts' endpoint.
   */
    public function testAddShift()
    {
      $client = self::createClient();
      $user = $this->createUser(
        'anotherUser@example.com',
        'foo',
        '042515183',
        '80.00',
        'https://imapictureofnothing.com',
        'testme',
        'now', ['ROLE_USER', 'ROLE_ADMIN']);
      try {
        $client->request('POST', '/shifts', [
          'headers' => [
            'Content-Type' => 'application/json'
          ],
          'json' => [
            'start' => '2020-12-12 10:00:00',
            'end' => '2020-12-12 18:00:00',
            'onDuty' => '/users/'.$user->getId(),
            'ShiftStatus' => 'primary',
            'isApproved' => false
          ]
        ]);
      } catch (TransportExceptionInterface $e) {
      }
      $this->assertResponseStatusCodeSame(201);
    }


  /**
   * Tests the PUT method to edit a shift using the PUT method at '/shifts/:uuid' endpoint.
   * @throws TransportExceptionInterface
   */
    public function testEditShift()
    {
      $date = new DateTime();
      $client = self::createClient();
      $user = $this->createUser(
        'anotherUser@example.com',
        'foo',
        '042515183',
        '80.00',
        'https://imapictureofnothing.com',
        'testme',
        'now', ['ROLE_USER', 'ROLE_ADMIN']);

      $shift = new ScheduledShift();
      $shift->setOnDuty($user);
      $shift->setStart($date);
      $shift->setEnd($date);
      $shift->setIsApproved(true);
      $shift->setShiftStatus('primary');
      $em = $this->getEntityManager();
      $em->persist($shift);
      $em->flush();
      $client->request('PUT', '/shifts/'.$shift->getId(), [
        'headers' => ['Content-Type' => 'application/json'],
        'json' => [
        'start' => '2021-12-12 10:00:00',
        'end' => '2021-12-12 20:00:00',
        'ShiftStatus' => 'secondary',
        'isApproved' => false]
      ]);
      $this->assertResponseStatusCodeSame(200);
    }

    public function testGetComments()
    {
      $client = self::createClient();
      $client->request('GET', '/comments');
      $this->assertResponseStatusCodeSame(200);
    }

  /**
   * Tests POST to create comment at '/shift-comments' endpoint.
   *
   * @throws TransportExceptionInterface
   */
    public function testAddComment()
    {
      $date = new Datetime();
      $d = date('Y-m-d H:i:s');
      $client = self::createClient();
      $user = $this->createUser(
        'yet_anotherUser@example.com',
        'foo',
        '042515183',
        '80.00',
        'https://imapictureofnothing.com',
        'testme',
        'now', ['ROLE_USER', 'ROLE_ADMIN']);

      $shift = new ScheduledShift();
      $shift->setOnDuty($user);
      $shift->setStart($date);
      $shift->setEnd($date);
      $shift->setIsApproved(true);
      $shift->setShiftStatus('primary');
      $em = $this->getEntityManager();
      $em->persist($shift);
      $em->flush();

      $id = $user->getId();
      $client->request('POST', '/comments', [
        'headers' => [
          'Content-Type' => 'application/json',
        ],
        'json' => [
          'authoredBy' => '/users/'.$user->getId(),
          'shift' => '/shifts/'.$shift->getId(),
          'dateOfComment' => $d,
          'recipient' => '/users/'.$id,
          'markedAsRead' => true,
          'isPrivate' => true,
          'subject' => 'Chit Chat',
          'comment' => 'Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation',
         ]
      ]);
      $this->assertResponseStatusCodeSame(201);
    }

  /**
   * Tests the PUT method to edit a comment at '/test-comments/:uuid' endpoint.
   *
   * @throws TransportExceptionInterface
   */
    public function testEditComment()
    {
      $date = new Datetime();
      $d = date('Y-m-d H:i:s');
      $client = self::createClient();
      $user = $this->createUser(
        'yet_anotherUser@example.com',
        'foo',
        '042515183',
        '80.00',
        'https://imapictureofnothing.com',
        'testme',
        'now', ['ROLE_USER', 'ROLE_ADMIN']);

      $shift = new ScheduledShift();
      $shift->setOnDuty($user);
      $shift->setStart($date);
      $shift->setEnd($date);
      $shift->setIsApproved(true);
      $shift->setShiftStatus('primary');
      $em = $this->getEntityManager();
      $em->persist($shift);
      $em->flush();

      $comment = new ShiftComments();
      $comment->setAuthoredBy($user);
      $comment->setShift($shift);
      $comment->setComment('Blah Blah Blah!');
      $comment->setDateOfComment($date);
      $comment->setRecipient($user);
      $comment->setMarkedAsRead(true);
      $comment->setSubject('Comment!');
      $comment->setIsPrivate(true);
      $em = $this->getEntityManager();
      $em->persist($comment);
      $em->flush();
      $id = $user->getId();

      $client->request('PUT', '/comments/'.$comment->getId(), [
        'headers' => [
          'Content-Type' => 'application/json',
        ],
        'json' => [
          'authoredBy' => '/users/'.$user->getId(),
          'shift' => '/shifts/'.$shift->getId(),
          'dateOfComment' => $d,
          'comment' => 'I am a string of edited text! Hear me roar!',
          'markedAsRead' => true,
          'recipient' => '/users/'.$id,
          'isPrivate' => false,
          'subject' => 'General Chit Chat'
        ]]);
      $this->assertResponseStatusCodeSame(200);
    }

  /**
   * Tests DELETE to delete comment at '/shift-comments/:uuid' endpoint.
   *
   * @throws TransportExceptionInterface
   */
  public function testDeleteComment()
  {
    $date = new Datetime();
    $client = self::createClient();
    $user = $this->createUser(
      'yet_anotherUser@example.com',
      'foo',
      '042515183',
      '80.00',
      'https://imapictureofnothing.com',
      'testme',
      'now', ['ROLE_USER', 'ROLE_ADMIN']);

    $shift = new ScheduledShift();
    $shift->setOnDuty($user);
    $shift->setStart($date);
    $shift->setEnd($date);
    $shift->setIsApproved(true);
    $shift->setShiftStatus('primary');
    $em = $this->getEntityManager();
    $em->persist($shift);
    $em->flush();

    $comment = new ShiftComments();
    $comment->setAuthoredBy($user);
    $comment->setShift($shift);
    $comment->setComment('I am another comment, Blah Blah Blah!');
    $comment->setDateOfComment($date);
    $comment->setMarkedAsRead(true);
    $comment->setIsPrivate(true);
    $comment->setSubject('Comment!');
    $comment->setRecipient($user);
    $em = $this->getEntityManager();
    $em->persist($comment);
    $em->flush();

    $client->request('DELETE', '/comments/'.$comment->getId());
    $this->assertResponseStatusCodeSame(204);
  }

  /**
   * Tests DELETE method to delete an instance of a shift at '/shifts/:uuid' endpoint.
   *
   * @throws TransportExceptionInterface
   */
  public function testDeleteShift()
  {
    $date = new \Datetime();
    $client = self::createClient();
    $user = $this->createUser(
      'yet_anotherUser@example.com',
      'foo',
      '042515183',
      '80.00',
      'https://imapictureofnothing.com',
      'testme',
      'now', ['ROLE_USER', 'ROLE_ADMIN']);

    $shift = new ScheduledShift();
    $shift->setOnDuty($user);
    $shift->setStart($date);
    $shift->setEnd($date);
    $shift->setIsApproved(true);
    $shift->setShiftStatus('primary');
    $em = $this->getEntityManager();
    $em->persist($shift);
    $em->flush();
    $client->request('DELETE', '/shifts/'.$shift->getId());
    $this->assertResponseStatusCodeSame(204);
  }

  /**
   * Tests PUT to edit a user at '/users/:uuid' endpoint.
   *
   * @throws TransportExceptionInterface
   */
  public function testEditUser()
  {
    $client = self::createClient();
    $user = $this->createUser(
      'yet_anotherUser@example.com',
      'foo',
      '042515183',
      '80.00',
      'https://imapictureofnothing.com',
      'testme',
      'now', ['ROLE_USER', 'ROLE_ADMIN']);
    $client->request('PUT', '/users/'.$user->getId(), [
      'headers' => [
        'Content-Type' => 'application/json',
      ], 'json' => [
        'firstName' => 'Im a new name!'
      ]
    ]);
    $this->assertResponseStatusCodeSame(200);
  }

  /**
   * Tests GET to fetch a single instance of a user at '/users/:uuid' endpoint.
   *
   * @throws TransportExceptionInterface
   */
  public function testGetUserById()
  {
    $client = self::createClient();
    $user = $this->createUser(
      'yet_anotherUser@example.com',
      'foo',
      '042515183',
      '80.00',
      'https://imapictureofnothing.com',
      'testme',
      'now', ['ROLE_USER', 'ROLE_ADMIN']);
    $client->request('GET', '/users/'.$user->getId(), [
      'headers' => [
        'Content-Type' => 'application/json',
      ]
    ]);
    $this->assertResponseStatusCodeSame(200);
  }

  /**
   * Tests GET method fetch a single instance of a comment at '/shift-comments/:uuid' endpoint.
   * Receives a 200
   *
   * @throws TransportExceptionInterface
   */
  public function testGetCommentById()
  {
    $date = new \Datetime();
    $client = self::createClient();
    $user = $this->createUser(
      'yet_anotherUser@example.com',
      'foo',
      '042515183',
      '80.00',
      'https://imapictureofnothing.com',
      'testme',
      'now', ['ROLE_USER', 'ROLE_ADMIN']);

    $shift = new ScheduledShift();
    $shift->setOnDuty($user);
    $shift->setStart($date);
    $shift->setEnd($date);
    $shift->setIsApproved(true);
    $shift->setShiftStatus('primary');
    $em = $this->getEntityManager();
    $em->persist($shift);
    $em->flush();

    $comment = new ShiftComments();
    $comment->setAuthoredBy($user);
    $comment->setShift($shift);
    $comment->setComment('I am another comment, Blah Blah Blah!');
    $comment->setDateOfComment($date);
    $comment->setRecipient($user);
    $comment->setIsPrivate(true);
    $comment->setSubject('Comment!');
    $comment->setMarkedAsRead(false);
    $em = $this->getEntityManager();
    $em->persist($comment);
    $em->flush();

    $client->request('GET', '/comments/'.$comment->getId());
    $this->assertResponseStatusCodeSame(200);
  }

  /**
   * Tests GET to fetch to a single instance of a comment at '/shift-comments/:uuid' endpoint.
   * Receives a 200 OK
   *
   * @throws TransportExceptionInterface
   */
  public function testGetShiftById()
  {
    $date = new \Datetime();
    $client = self::createClient();
    $user = $this->createUser(
      'yet_anotherUser@example.com',
      'foo',
      '042515183',
      '80.00',
      'https://imapictureofnothing.com',
      'testme',
      'now', ['ROLE_USER', 'ROLE_ADMIN']);

    $shift = new ScheduledShift();
    $shift->setOnDuty($user);
    $shift->setStart($date);
    $shift->setEnd($date);
    $shift->setIsApproved(true);
    $shift->setShiftStatus('primary');
    $em = $this->getEntityManager();
    $em->persist($shift);
    $em->flush();

    $client->request('GET', '/shifts/'.$shift->getId());
    $this->assertResponseStatusCodeSame(200);
  }
  /**
   * Tests DELETE to delete an instance of a user at '/users/:uuid' endpoint.
   * Receives a 204 No Content
   *
   * @throws TransportExceptionInterface
   */
  public function testDeleteUser()
  {
    $client = self::createClient();
    $user = $this->createUser(
      'yet_anotherUser@example.com',
      'foo',
      '042515183',
      '80.00',
      'https://imapictureofnothing.com',
      'testme',
      'now', ['ROLE_USER', 'ROLE_ADMIN']);
    $client->request('DELETE', '/users/'.$user->getId(), [
      'headers' => [
        'Content-Type' => 'application/json',
      ]
    ]);
    $this->assertResponseStatusCodeSame(204);
  }
}
