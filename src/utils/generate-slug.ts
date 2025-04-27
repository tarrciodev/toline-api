export function generateSlug(input: string): string {
    return input
        .toLowerCase() // Converte para minúsculas
        .normalize("NFD") // Normaliza para separar os acentos das letras
        .replace(/\p{Diacritic}/gu, "") // Remove os caracteres diacríticos (acentos)
        .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres não permitidos (apenas letras, números, espaços e hifens)
        .trim() // Remove espaços extras no início e no fim
        .replace(/\s+/g, "-"); // Substitui espaços por hifens
}
