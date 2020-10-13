<?php


namespace App\Tests;


use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\JWTUserToken;

class ApitTest extends  ApiTestCase
{
    private $token;

    public function testCreateUserUnAuthorized()
    {
        $client = self::createClient();
        $client->request('POST', '/users', [
            'headers' => [
                'Content-Type' => 'application/json',
                'json' => []]]);
        $this->assertResponseStatusCodeSame(401);
    }

    public function testGetUsersUnAuthorized()
    {
        $client = self::createClient();
        $client->request('GET', '/shifts',[
            'headers' => ['Content-Type', 'application/json']
        ]);
        $this->assertResponseStatusCodeSame(401);
    }

    public function testGetShiftsUnauthorized()
    {
        $client = self::createClient();
        $client->request('GET', '/shifts', [
            'headers' => ['Contnet-Type', 'application/json']
        ]);
        $this->assertResponseStatusCodeSame(401);
    }

    public function testGetCommentsUnauthorized()
    {
        $client = self::createClient();
        $client->request('GET', 'application/json', [
            'headers' => ['Content-Type' => 'application/json']
        ]);
        $this->assertResponseStatusCodeSame(401);
    }

    public function testPostUserUnauthorized()
    {
        $client = self::createClient();
        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
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
        $this->assertResponseStatusCodeSame(401);
    }


    public function loginUser()
    {
        $client = self::createClient();
        $client->request('POST', '/login',[
        'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'admin@example.com',
                'password' => 'password',
            ]
        ]);
        $this->assertResponseStatusCodeSame(200);
    }

}