<?php

namespace App\ApiPlatform\Test;

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
 *     shortName="shifts"
 * )
 * @ApiFilter(DateFilter::class, properties={"start", "end"})
 * @ApiFilter(BooleanFilter::class, properties={"isApproved"})
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "ShiftStatus": "exact"})
 * @ApiFilter(OrderFilter::class, properties={"start", "end"}, arguments={"orderParameterName"="order"})
 * @Type(name="Shifts")
 * @ORM\Table(name="scheduled_shift", indexes={@ORM\Index(name="IDX_E776626E7CB2CD68", columns={"on_duty_id"})})
 * @ORM\Entity(repositoryClass="App\Repository\ScheduledShiftsRepository")
 */
class TestScheduledShift
{
    /**
     * @var UuidInterface
     *
     * @ORM\Column(name="id", type="uuid_binary", nullable=false, unique=true)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class=UuidGenerator::class)
     * @Groups({"shift:read", "user:read", "shift-comments:read"})
     */
    private $id;

    /**
     * @var DateTimeInterface
     * @Groups({"shift:read", "shift:write", "user:read"})
     * @ORM\Column(name="start", type="datetime", nullable=false)
     */
    private $start;

    /**
     * @var DateTimeInterface
     * @Groups({"shift:read", "shift:write", "user:read"})
     * @ORM\Column(name="end", type="datetime", nullable=false)
     */
    private $end;

    /**
     *
     * @Groups({"shift:read", "shift:write", "shift-comments:read"})
     * @ORM\ManyToOne(targetEntity="User", inversedBy="shifts")
     * @ORM\JoinColumns({
     * @ORM\JoinColumn(name="on_duty_id", referencedColumnName="id")
     * })
     */
    private $onDuty;

    /**
     * @ApiSubresource()
     * @Groups({"shift:read"})
     * @ORM\OneToMany(targetEntity=TestShiftComments::class, mappedBy="shift")
     */
    private $comments;

    /**
     * @Groups({"shift:read", "shift:write", "user:read"})
     * @ORM\Column(type="string", name="shift_status", nullable=false)
     */
    private $ShiftStatus;

    /**
     * @Groups({"shift:read", "shift:write", "user:read"})
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
     * @return TestScheduledShift
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
     * @return TestUser
     */
    public function getOnDuty(): ?TestUser
    {
        return $this->onDuty;
    }

    /**
     * @param TestUser|null $onDuty
     * @return $this
     */
    public function setOnDuty(?TestUser $onDuty): self
    {
        $this->onDuty = $onDuty;

        return $this;
    }

    /**
     * @return Collection|TestShiftComments[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    /**
     * @param TestShiftComments $comment
     * @return $this
     */
    public function addComment(TestShiftComments $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setShift($this);
        }

        return $this;
    }

    /**
     * @param TestShiftComments $comment
     * @return $this
     */
    public function removeComment(TestShiftComments $comment): self
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
