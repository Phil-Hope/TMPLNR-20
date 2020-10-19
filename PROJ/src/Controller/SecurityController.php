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
        'exp' => time() + 360000 // 1HR
      ]);
      return new Response($user->getId(), 200, [
        'token' => $token,
        'Location' => $iriConverter->getIriFromItem($this->getUser()->getId())
      ]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout(Security $security)
    {
      return $security->getToken()->eraseCredentials();
    }
}
