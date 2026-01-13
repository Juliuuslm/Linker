/**
 * Valida números de teléfono por país
 */
export function validatePhoneNumber(countryCode: string, phone: string): {
  isValid: boolean;
  error?: string;
} {
  const cleanPhone = phone.replace(/\D/g, "");

  // Longitudes válidas por país (simplificado)
  const phoneLengths: Record<string, { min: number; max: number }> = {
    "+52": { min: 10, max: 10 }, // México
    "+1": { min: 10, max: 10 },  // USA/Canadá
    "+54": { min: 10, max: 11 }, // Argentina
    "+57": { min: 10, max: 10 }, // Colombia
    "+34": { min: 9, max: 9 },   // España
    // Agregar más países según necesites
  };

  const config = phoneLengths[countryCode];

  if (!config) {
    // País no validado, permitir 7-15 dígitos
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      return {
        isValid: false,
        error: "Número de teléfono debe tener entre 7 y 15 dígitos"
      };
    }
    return { isValid: true };
  }

  if (cleanPhone.length < config.min || cleanPhone.length > config.max) {
    return {
      isValid: false,
      error: `Número inválido para ${countryCode}. Debe tener ${config.min} dígitos`
    };
  }

  // No debe empezar con 0
  if (cleanPhone.startsWith("0")) {
    return {
      isValid: false,
      error: "El número no debe empezar con 0"
    };
  }

  return { isValid: true };
}
