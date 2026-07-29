namespace Application.DTOs.WalletDTOs {
    public record WalletCredentialsDTO(string ApiKey, string SecretKey, string ExchangeName, string Type, string? PassPhrase);
}