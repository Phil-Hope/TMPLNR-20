<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use DateTime;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidBinaryType;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Mutation;
use TheCodingMachine\GraphQLite\Annotations\Query;
use TheCodingMachine\GraphQLite\Annotations\Type;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Ramsey\Uuid\Doctrine\UuidGenerator;

/**
 * ScheduledShift
 * @ApiResource(
 *     normalizationContext={"groups"={"shift:read"}, "swagger_definition_name"="Read"},
 *     denormalizationContext={"groups"={"shift:write"}, "swagger_definition_name"="Write"},
 *   shortName="shifts",
 *     graphql={
 *         "item_query",
 *         "collection_query"={
 *     {"pagination_enabled"=true},
 *              "filters"={"start.date_filter"}
 *          },
 *          "delete",
 *          "update",
 *          "create"
 *     }
 * )
 * @ApiFilter(DateFilter::class, properties={"start", "end"})
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "ShiftStatus": "exact"})
 * @Type(name="Shifts")
 * @ORM\Table(name="scheduled_shift", indexes={@ORM\Index(name="IDX_E776626E7CB2CD68", columns={"on_duty_id"})})
 * @ORM\Entity(repositoryClass="App\Repository\ScheduledShiftRepository")
 */
class ScheduledShift
{
    /**
     * @var UuidInterface
     *
     * @ORM\Column(name="id", type="uuid_binary", nullable=false, unique=true)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class=UuidGenerator::class)
     * @Groups({"shift:read", "user:read"})
     */
    private $id;

    /**
     * @var DateTime
     * @Groups({"shift:read", "shift:write", "user:read", "comments:read"})
     * @ORM\Column(name="start", type="datetime", nullable=false)
     */
    private $start;

    /**
     * @var DateTime
     * @Groups({"shift:read", "shift:write", "user:read", "comments:read"})
     * @ORM\Column(name="end", type="datetime", nullable=false)
     */
    private $end;

    /**
     * @ApiSubresource()
     * @Groups({"shift:read", "shift:write"})
     * @ORM\ManyToOne(targetEntity="User", inversedBy="shifts")
     * @ORM\JoinColumns({
     * @ORM\JoinColumn(name="on_duty_id", referencedColumnName="id")
     * })
     */
    private $onDuty;

    /**
     * @ApiSubresource()
     * @Groups({"shift:read"})
     * @ORM\OneToMany(targetEntity=ShiftComments::class, mappedBy="shift")
     */
    private $comments;

    /**
     * @Groups({"shift:read", "shift:write"})
     * @ORM\Column(type="string", name="shift_status", nullable=false)
     */
    private $ShiftStatus;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
    }

    /**
     * @Field(outputType="ID")
     * @return UuidInterface
     * @var UuidBinaryType
     * @ApiProperty(identifier=true)
     */
    public function getId(): UuidInterface
    {
        return $this->id;
    }

    /**
     * @Field(outputType="String")
     */
    public function getStart(): ?DateTimeInterface
    {
        return $this->start;
    }

    /**
     * @param DateTimeInterface $start
     * @Mutation()
     * @return ScheduledShift
     */
    public function setStart(DateTimeInterface $start): self
    {
        $this->start = $start;

        return $this;
    }

    /**
     * @Field()
     */
    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    /**
     * @param \DateTimeInterface $end
     * @return $this
     * @Mutation()
     */
    public function setEnd(\DateTimeInterface $end): self
    {
        $this->end = $end;

        return $this;
    }

    /**
     * @Query
     * @return User
     */
    public function getOnDuty(): ?User
    {
        return $this->onDuty;
    }

    /**
     * @param User|null $onDuty
     * @return $this
     * @Mutation()
     */
    public function setOnDuty(?User $onDuty): self
    {
        $this->onDuty = $onDuty;

        return $this;
    }

    /**
     * @Query()
     * @return Collection|ShiftComments[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    /**
     * @param ShiftComments $comment
     * @return $this
     * @Mutation()
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
     * @Mutation()
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

    /**
     * @Field()
     */
    public function getShiftStatus()
    {
      return $this->ShiftStatus;
    }

    /**
     * @Mutation()
     */
    public function setShiftStatus($ShiftStatus)
    {
        $this->ShiftStatus = $ShiftStatus;

        return $this;
    }


}
