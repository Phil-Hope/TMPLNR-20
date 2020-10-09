<?php


namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessListener
{
  /**
   * @param AuthenticationSuccessEvent $event
   */
  public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
  {
    $data = $event->getData();
    $eventData = $event->getData();
    $user = $event->getUser();

    if(!$user instanceof UserInterface) {
      return;
    }
    if(isset($eventData['token'])){
      $response = $event->getResponse();

      $jwt = $data['token'];
      $response->headers->setCookie(
        new Cookie(
          "BEARER",
          $jwt,
          new \DateTime("+1 day"),
          "/", null, true,
          true, false, 'strict'
        )
      );
    }
    $data['data'] = array(
      'roles' => $user->getRoles(),
      'id' => $user->getId()
    );

    $event->setData($data);
  }

}
