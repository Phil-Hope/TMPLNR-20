<?php

namespace App\Controller;

use ApiPlatform\Core\Api\IriConverterInterface;
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
  /**
   * @Route("/login", name="api_login", methods={"POST"})
   * @param Request $request
   * @param IriConverterInterface $iriConverter
   * @param JWTTokenManagerInterface $JWTManager
   * @param UserRepository $repository
   * @param UserPasswordEncoderInterface $encoder
   * @return JsonResponse|Response
   */
    public function loginAPI( Request $request,
        IriConverterInterface  $iriConverter, JWTTokenManagerInterface $JWTManager, UserRepository $repository, UserPasswordEncoderInterface $encoder)
    {
      $user = $this->$repository->findOneBy(['email' => $request->getUser()]);

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
      return new Response($user->getUser->getId(), 200, [
        'token' => $token,
        'Location' => $iriConverter->getIriFromItem($this->getUser()->getId())
      ]);
    }

    public function register() {

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
