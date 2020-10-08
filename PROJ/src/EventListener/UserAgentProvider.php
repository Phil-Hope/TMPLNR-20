<?php


namespace App\EventListener;


use Maba\Bundle\GentleForceBundle\Service\IdentifierProvider\IdentifierProviderInterface;
use Symfony\Component\HttpFoundation\Request;

class UserAgentProvider implements IdentifierProviderInterface
{

    /**
     * @inheritDoc
     */
    public function getIdentifier(Request $request)
    {
        return $request->headers->get('User-Agent');
    }
}
