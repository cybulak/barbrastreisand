namespace BarbraStreisand.IdentityServer
{
    using System.Collections.Generic;
    using IdentityServer4.Models;
    using IdentityServer4.Test;

    public static class Config
    {
        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "wonszrzeczny",
                    Password = "jestniebezpieczny"
                }
            };
        }

        public static IEnumerable<ApiResource> GetApis()
        {
            return new List<ApiResource>
            {
                new ApiResource("BarbraStreisandApi")
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "BarbraStreisandFront",
                    ClientName = "BarbraStreisandFront",
                    AllowedGrantTypes = {GrantType.ResourceOwnerPassword},
                    RedirectUris = {"http://localhost:50000/signin-oidc"},
                    PostLogoutRedirectUris = {"http://localhost:50000/signout-callback-oidc"},

                    ClientSecrets =
                    {
                        new Secret("86f356b1-392c-4c5a-b841-1f090c5e8145".Sha256())
                    },
                    AllowedScopes =
                    {
                        "BarbraStreisandApi"
                    }
                }
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource> {new IdentityResources.Profile()};
        }
    }
}