<?php

namespace App\Controller;

use ApiPlatform\Core\Api\IriConverterInterface;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;


class SecurityController extends AbstractController
{
  private UserRepository $repository;

  public function __construct(UserRepository $repository)
  {
    $this->repository = $repository;
  }


  /**
   * @Route("/login", name="api_login", methods={"POST"})
   * @param Request $request
   * @param IriConverterInterface $iriConverter
   * @param JWTTokenManagerInterface $JWTManager
   * @param UserPasswordEncoderInterface $encoder
   * @param UserRepository $repository
   * @return JsonResponse|Response
   */
    public function loginAPI(
      Request $request,
      IriConverterInterface  $iriConverter,
      JWTTokenManagerInterface $JWTManager,
      UserPasswordEncoderInterface $encoder,
      UserRepository $repository
)
    {
      $user = $repository->findOneBy(['email' => $request->getUser()]);

      if (!$user) {
        throw $this->createNotFoundException();
      }
      $isValid = $this->get($encoder)->isPasswordValid($user, $request->getPassword());

      if(!$isValid) {
        throw new BadCredentialsException();
      }
      $token = $this->get($JWTManager)->encode([
        'email' => $user->getUsername(),
        'exp' => time() + 3600 // 1HR
      ]);
      return new Response($user->getId(), 200, [
        'token' => $token,
        'Location' => $iriConverter->getIriFromItem($this->getUser()->getId())
      ]);
    }

  /**
   * @param UserPasswordEncoderInterface $encoder
   * @param Request $request
   * @return Response
   * @Route("/register", name="api_register", methods={"POST"})
   */
    public function register(UserPasswordEncoderInterface $encoder, Request $request) {
      $em = $this->getDoctrine()->getManager();
      $email = $request->request->get('email');
      $password = $request->request->get('password');
      $firstName = $request->request->get('firstName');
      $lastName = $request->request->get('lastName');
      $contactNumber = $request->request->get('contactNumber');
      $profilePicture = $request->request->get('profilePicture');
      $wagePerHour = $request->request->get('wagePerHour');
      $roles = $request->request->get('roles');

      $user = new User();

      $user->setEmail($email);
      $user->setFirstName($firstName);
      $user->setLastName($lastName);
      $user->setContactNumber($contactNumber);
      $user->setProfilePicture($profilePicture);
      $user->setWagePerHour($wagePerHour);
      $user->setRoles($roles);
      $user->setPassword($encoder->encodePassword($user, $password));

      $em->persist($user);
      $em->flush();

      return new Response(sprintf('User %s successfully registered', $user->getUsername()));
    }

    /**
     * @Route("/", name="app_login")
     * @param AuthenticationUtils $authenticationUtils
     * @return Response
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout(Security $security)
    {
      return $security->getToken()->eraseCredentials();
    }
}
