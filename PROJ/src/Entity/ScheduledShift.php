<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidBinaryType;
use Ramsey\Uuid\Lazy\LazyUuidFromString;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Type;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
/**
 * TestScheduledShift
 * @ApiResource(
 *     normalizationContext={"groups"={"shift:read"}, "swagger_definition_name"="Read"},
 *     denormalizationContext={"groups"={"shift:write"}, "swagger_definition_name"="Write"},
 *   shortName="shifts"
 *   )
 * @ApiFilter(DateFilter::class, properties={"start", "end"})
 * @ApiFilter(BooleanFilter::class, properties={"isApproved"})
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "ShiftStatus": "exact"})
 * @ApiFilter(OrderFilter::class, properties={"start", "end"}, arguments={"orderParameterName"="order"})
 * @Type(name="Shifts")
 * @ORM\Table(name="scheduled_shift", indexes={@ORM\Index(name="IDX_E776626E7CB2CD68", columns={"on_duty_id"})})
 * @ORM\Entity(repositoryClass="App\Repository\ScheduledShiftRepository")
 */

// *   attributes={"security"="is_granted('ROLE_USER')"},
// *   collectionOperations={
//  *   "get",
// *   "post"
//  * },
// *   itemOperations={
//  *   "get",
// *   "put"={"security"="is_granted('ROLE_ADMIN') or object.getOnDuty() == user"},
// *   "delete"={"security"="is_granted('ROLE_ADMIN') or object.getOnDuty() == user"}},
// *   shortName="shifts"
//  * )



class ScheduledShift
{
    /**
     * @var UuidInterface
     *
     * @ORM\Column(name="id", type="uuid_binary", nullable=false, unique=true)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class=UuidGenerator::class)
     * @Groups({"shift:read", "comments:read"})
     */
    private $id;

    /**
     * @var DateTimeInterface
     * @Assert\NotBlank()
     * @Groups({"shift:read", "shift:write", "comments:read"})
     * @ORM\Column(name="start", type="datetime", nullable=false)
     */
    private $start;

    /**
     * @var DateTimeInterface
     * @Assert\NotBlank()
     * @Groups({"shift:read", "shift:write", "comments:read"})
     * @ORM\Column(name="end", type="datetime", nullable=false)
     */
    private $end;

    /**
     * @Assert\NotBlank()
     * @Groups({"shift:read", "shift:write", "comments:read"})
     * @ORM\ManyToOne(targetEntity="User", inversedBy="shifts")
     * @ORM\JoinColumns({
     * @ORM\JoinColumn(name="on_duty_id", referencedColumnName="id")
     * })
     */
    private $onDuty;

    /**
     * @ApiSubresource()
     * @Groups({"shift:read"})
     * @ORM\OneToMany(targetEntity=ShiftComments::class, mappedBy="shift", cascade={"persist", "remove"})
     */
    private $comments;

    /**
     * @Assert\NotBlank()
     * @Groups({"shift:read", "shift:write"})
     * @ORM\Column(type="string", name="shift_status", nullable=false)
     */
    private $ShiftStatus;

    /**
     * @Groups({"shift:read", "shift:write"})
     * @ORM\Column(type="boolean", name="is_approved", nullable=false)
     */
    private $isApproved;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
    }

    /**
     * @return LazyUuidFromString|UuidInterface
     * @var UuidBinaryType
     * @ApiProperty(identifier=true)
     */
    public function getId(): LazyUuidFromString
    {
        return $this->id;
    }

    public function getStart(): ?DateTimeInterface
    {
        return $this->start;
    }

    /**
     * @param DateTimeInterface $start
     * @return ScheduledShift
     */
    public function setStart(DateTimeInterface $start): self
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?DateTimeInterface
    {
        return $this->end;
    }

    /**
     * @param DateTimeInterface $end
     * @return $this
     */
    public function setEnd(DateTimeInterface $end): self
    {
        $this->end = $end;

        return $this;
    }

    /**
     * @return User
     */
    public function getOnDuty(): ?User
    {
        return $this->onDuty;
    }

    /**
     * @param User|null $onDuty
     * @return $this
     */
    public function setOnDuty(?User $onDuty): self
    {
        $this->onDuty = $onDuty;

        return $this;
    }

    /**
     * @return Collection|ShiftComments[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    /**
     * @param ShiftComments $comment
     * @return $this
     */
    public function addComment(ShiftComments $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setShift($this);
        }

        return $this;
    }

    /**
     * @param ShiftComments $comment
     * @return $this
     */
    public function removeComment(ShiftComments $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getShift() === $this) {
                $comment->setShift(null);
            }
        }

        return $this;
    }

    public function getShiftStatus()
    {
      return $this->ShiftStatus;
    }

    public function setShiftStatus($ShiftStatus)
    {
        $this->ShiftStatus = $ShiftStatus;

        return $this;
    }

    public function getIsApproved(): ?bool
    {
        return $this->isApproved;
    }

    public function setIsApproved(bool $isApproved): self
    {
        $this->isApproved = $isApproved;

        return $this;
    }


}
