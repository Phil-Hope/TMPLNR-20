<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Lazy\LazyUuidFromString;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Mutation;
use TheCodingMachine\GraphQLite\Annotations\Query;
use TheCodingMachine\GraphQLite\Annotations\Type;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
/**
 * User
 * @ApiResource(
 *     normalizationContext={"groups"={"user:read"}, "swagger_definition_name"="Read"},
 *     denormalizationContext={"groups"={"user:write"}, "swagger_definition_name"="Write"},
 *     shortName="user",
 * )
 * @ApiFilter(BooleanFilter::class, properties={"recievedComments.markedAsRead"})
 * @ApiFilter(OrderFilter::class, properties={"lastName", "firstName"}, arguments={"orderParameterName"="order"})
 * @Type(name="Users")
 * @ORM\Table(name="user", uniqueConstraints={@ORM\UniqueConstraint(name="UNIQ_8D93D649E7927C74", columns={"email"})})
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity(fields={"email"}, message="There is already an account with this email")
 */

// *   attributes={"security"="is_granted('ROLE_USER')"},
// *   collectionOperations={
// *   "get",
// *   "post"},
// *   itemOperations={"get",
// *   "put"={"security"="is_granted('ROLE_ADMIN') or object == user"},
// *   "delete"={"security"="is_granted('ROLE_ADMIN') or object == user"}
// *   },


class User implements UserInterface
{
    /**
     * @var UuidInterface
     * @ORM\Column(name="id", type="uuid_binary", nullable=false, unique=true)
     * @ORM\Id
     * @ORM\CustomIdGenerator(class=UuidGenerator::class)
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @Groups({"user:read", "shift:read", "comments:read"})
     */
    private $id;

    /**
     *
     * @Groups({"user:read", "user:write"})
     * @ORM\Column(name="email", type="string", length=180, nullable=false)
     */
    private $email;

    /**
     * @ORM\Column(name="roles", type="json", nullable=false)
     * @Groups({"user:read", "user:write"})
     */
    private $roles;

    /**
     * @Assert\NotBlank(message="Password field can not be blank")
     *@Assert\Length(min="6", minMessage="Password must be at least 6 characters long")
     * @SerializedName("password")
     * @Groups({"user:write"})
     * @ORM\Column(name="password", type="string", length=255, nullable=false)
     */
    private $password;

    /**
     * @Assert\NotBlank(message="FirstName field can not be blank")
     * @Assert\Length(max="50", maxMessage="Max 50 characters for FirstName")
     * @Groups({"user:read", "user:write", "shift:read", "comments:read"})
     * @ORM\Column(name="first_name", type="string", length=50, nullable=false)
     */
    private $firstName;

    /**
     * @Assert\NotBlank(message="LastName field can not be blank")
     * @Assert\Length(max="50", maxMessage="Max length of 50 for LastName")
     * @Groups({"user:read", "user:write", "shift:read", "comments:read"})
     * @ORM\Column(name="last_name", type="string", length=50, nullable=false)
     */
    private $lastName;

    /**
     * @Assert\Url(message="Profile picture must be a valid url")
     * @Groups({"user:read", "user:write", "shift:read"})
     * @ORM\Column(name="profile_picture", type="string", length=255, nullable=true)
     */
    private $profilePicture;

    /**
     * @Groups({"user:read", "user:write"})
     * @Assert\Length(max="5", maxMessage="Maximum length is 5 characters")
     * @ORM\Column(name="wage_per_hour", type="decimal", precision=5, scale=2, nullable=true)
     */
    private $wagePerHour;

    /**
     * @Groups({"user:read", "user:write"})
     * @Assert\NotBlank(message="Contact Number field can not be blank")
     * @ORM\Column(name="contact_number", type="string", length=15, nullable=false)
     */
    private $contactNumber;

    /**
     * @ApiSubresource()
     * @ORM\OneToMany(targetEntity=ScheduledShift::class, mappedBy="onDuty", cascade={"persist", "remove"})
     */
    private $shifts;

    /**
     * @ApiSubresource()
     * @Groups({"user:read"})
     * @ORM\OneToMany(targetEntity=ShiftComments::class, mappedBy="authoredBy", cascade={"persist", "remove"})
     */
    private $comments;

    /**
     * @ApiSubresource()
     * @ORM\OneToMany(targetEntity=ShiftComments::class, mappedBy="recipient", cascade={"persist", "remove"})
     */
    private $receivedComments;

    public function __construct()
    {
      $this->shifts = new ArrayCollection();
      $this->comments = new ArrayCollection();
      $this->receivedComments = new ArrayCollection();
    }

    /**
     * @Field()
     * @ApiProperty(identifier=true)
     * @return LazyUuidFromString|UuidInterface
     */
    public function getId(): LazyUuidFromString
    {
        return $this->id;
    }

    /**
     * @Field()
     */
    public function getEmail(): ?string
    {
        return $this->email;
    }

    /**
     * @Mutation
     */
    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @Field()
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * @Mutation
     */
    public function setRoles($roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @Field()
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    /**
     * @Mutation
     */
    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @Field()
     */
    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    /**
     * @Mutation
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * @Field()
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * @Mutation
     */
    public function setLastName(string $lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @Field()
     */
    public function getProfilePicture()
    {
        return $this->profilePicture;
    }

    /**
     * @Mutation
     */
    public function setProfilePicture($profilePicture)
    {
        $this->profilePicture = $profilePicture;

        return $this;
    }

    /**
     * @Field()
     */
    public function getWagePerHour()
    {
        return $this->wagePerHour;
    }

    /**
     * @Mutation
     */
    public function setWagePerHour(string $wagePerHour)
    {
        $this->wagePerHour = $wagePerHour;

        return $this;
    }

    /**
     * @Field()
     */
    public function getContactNumber()
    {
        return $this->contactNumber;
    }

    /**
     * @Mutation
     */
    public function setContactNumber($contactNumber)
    {
        $this->contactNumber = $contactNumber;

        return $this;
    }

    /**
    * @see UserInterface
    */
    public function getSalt()
    {
        // TODO: Implement getSalt() method.
    }

    /**
     * @Field()
     */
    public function getUsername()
    {
        return (string) $this->email;
    }

    /**
     * @Field()
     */
    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    /**
     * @Query
     * @return Collection|ScheduledShift[]
     */
    public function getShifts(): Collection
    {
        return $this->shifts;
    }

    /**
     * @Mutation
     */
    public function addShift(ScheduledShift $shift): self
    {
        if (!$this->shifts->contains($shift)) {
            $this->shifts[] = $shift;
            $shift->setOnDuty($this);
        }

        return $this;
    }

    /**
     * @Mutation
     */
    public function removeShift(ScheduledShift $shift): self
    {
        if ($this->shifts->contains($shift)) {
            $this->shifts->removeElement($shift);
            // set the owning side to null (unless already changed)
            if ($shift->getOnDuty() === $this) {
                $shift->setOnDuty(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ShiftComments[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(ShiftComments $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setAuthoredBy($this);
        }

        return $this;
    }

    public function removeComment(ShiftComments $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getAuthoredBy() === $this) {
                $comment->setAuthoredBy(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ShiftComments[]
     */
    public function getReceivedComments(): Collection
    {
        return $this->receivedComments;
    }

    public function addReceivedComment(ShiftComments $receivedComment): self
    {
        if (!$this->receivedComments->contains($receivedComment)) {
            $this->receivedComments[] = $receivedComment;
            $receivedComment->setRecipient($this);
        }

        return $this;
    }

    public function removeReceivedComment(ShiftComments $receivedComment): self
    {
        if ($this->receivedComments->contains($receivedComment)) {
            $this->receivedComments->removeElement($receivedComment);
            // set the owning side to null (unless already changed)
            if ($receivedComment->getRecipient() === $this) {
                $receivedComment->setRecipient(null);
            }
        }

        return $this;
    }


}
