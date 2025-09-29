import { z } from 'zod'

export const bookingFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  startPoint: z.string()
    .min(1, 'Pick-up location is required'),
  
  endPoint: z.string()
    .min(1, 'Drop-off location is required'),
  
  tripType: z.enum(['1-way', '2-way'], {
    message: 'Please select a trip type'
  }),
  
  passengers: z.string()
    .min(1, 'Please select number of passengers'),
  
  pickupDate: z.string()
    .min(1, 'Pick-up date is required'),
  
  pickupTime: z.string()
    .min(1, 'Pick-up time is required'),
  
  contactNumber: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true // Optional field
      return /^\+?[1-9]\d{1,14}$/.test(val.replace(/\s/g, ''))
    }, 'Please enter a valid phone number (e.g., +1234567890)'),
  
  specialRequests: z.string()
    .max(500, 'Special requests must be less than 500 characters')
    .optional()
})

export type BookingFormData = z.infer<typeof bookingFormSchema>

// Force TypeScript to recompile
