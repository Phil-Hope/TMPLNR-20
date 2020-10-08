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
/**
 * User
 * @ApiResource(
 *     normalizationContext={"groups"={"user:read"}, "swagger_definition_name"="Read"},
 *     denormalizationContext={"groups"={"user:write"}, "swagger_definition_name"="Write"},
 *   attributes={"security"="is_granted('ROLE_USER')"},
 *   collectionOperations={
 *   "get", "post",
 *   },
 *   itemOperations={
 *   "get",
 *   "put"={"security"="is_granted('ROLE_ADMIN') or object.owner == user"},
 *   "delete"={"security"="is_granted('ROLE_ADMIN')"}
 *   },
 * )
 * @ApiFilter(OrderFilter::class, properties={"lastName", "firstName"}, arguments={"orderParameterName"="order"})
 * @Type(name="Users")
 * @ORM\Table(name="user", uniqueConstraints={@ORM\UniqueConstraint(name="UNIQ_8D93D649E7927C74", columns={"email"})})
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity(fields={"email"}, message="There is already an account with this email")
 */
class User implements UserInterface
{
    /**
     * @var UuidInterface
     * @ORM\Column(name="id", type="uuid_binary", nullable=false, unique=true)
     * @ORM\Id
     * @ORM\CustomIdGenerator(class=UuidGenerator::class)
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @Groups({"user:read", "shift:read"})
     */
    private $id;

    /**
     * @Assert\NotBlank()
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
     * @SerializedName("password")
     * @Groups({"user:write"})
     * @ORM\Column(name="password", type="string", length=255, nullable=false)
     */
    private $password;

    /**
     * @Groups({"user:read", "user:write", "shift:read", "comments:read"})
     * @ORM\Column(name="first_name", type="string", length=50, nullable=false)
     */
    private $firstName;

    /**
     * @Groups({"user:read", "user:write", "shift:read", "comments:read"})
     * @ORM\Column(name="last_name", type="string", length=50, nullable=false)
     */
    private $lastName;

    /**
     * @Groups({"user:read", "user:write", "shift:read"})
     * @ORM\Column(name="profile_picture", type="string", length=255, nullable=true)
     */
    private $profilePicture;

    /**
     * @Groups({"user:read", "user:write"})
     * @ORM\Column(name="wage_per_hour", type="decimal", precision=5, scale=2, nullable=true)
     */
    private $wagePerHour;

    /**
     * @Groups({"user:read", "user:write"})
     * @ORM\Column(name="contact_number", type="string", length=15, nullable=false)
     */
    private $contactNumber;

    /**
     * @ApiSubresource()
     * @Groups({"user:read"})
     * @ORM\OneToMany(targetEntity=ScheduledShift::class, mappedBy="onDuty")
     */
    private $shifts;

    public function __construct()
    {
      $this->shifts = new ArrayCollection();
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


}
