export interface QAIMessage {
  id: string;
  content: string;
  timestamp: string;
  isFromAI: boolean;
  type: 'text' | 'suggestion' | 'help';
}

export interface QAIResponse {
  message: string;
  suggestions?: string[];
  helpTopics?: string[];
}

export class QAIService {
  private static responses: Record<string, QAIResponse> = {
    'hello': {
      message: "Hello! I'm Q AI, your HR assistant. How can I help you today?",
      suggestions: [
        "How do I request time off?",
        "What are my benefits?",
        "How do I update my profile?",
        "What's my current salary?"
      ]
    },
    'time off': {
      message: "To request time off, go to the Leave Tracker section and click 'Request Leave'. You'll need to specify the dates and reason for your request.",
      suggestions: [
        "How much leave do I have left?",
        "How do I check my leave balance?",
        "What's the approval process?"
      ]
    },
    'benefits': {
      message: "Your benefits include health insurance, dental coverage, retirement plan, and paid time off. You can view detailed information in your employee profile.",
      suggestions: [
        "How do I update my benefits?",
        "When is open enrollment?",
        "What's covered by health insurance?"
      ]
    },
    'profile': {
      message: "To update your profile, go to Settings and select 'Profile Settings'. You can update your personal information, contact details, and preferences there.",
      suggestions: [
        "How do I change my password?",
        "How do I update my emergency contact?",
        "How do I upload a new photo?"
      ]
    },
    'salary': {
      message: "Your salary information is available in the Payroll section. You can view your current salary, payment history, and tax information there.",
      suggestions: [
        "How often do I get paid?",
        "How do I view my pay stubs?",
        "How do I update my tax information?"
      ]
    },
    'attendance': {
      message: "You can check your attendance in the Attendance section. You can see your check-in/check-out times, hours worked, and any time off taken.",
      suggestions: [
        "How do I check in?",
        "What if I forget to check out?",
        "How do I request overtime?"
      ]
    },
    'help': {
      message: "I'm here to help! I can assist you with HR-related questions about leave, benefits, payroll, attendance, and more. What would you like to know?",
      suggestions: [
        "How do I contact HR?",
        "What are the company policies?",
        "How do I report an issue?"
      ]
    }
  };

  static async getResponse(userMessage: string): Promise<QAIResponse> {
    const message = userMessage.toLowerCase().trim();
    
    // Find the best matching response
    for (const [key, response] of Object.entries(this.responses)) {
      if (message.includes(key) || this.calculateSimilarity(message, key) > 0.3) {
        return response;
      }
    }

    // Default response for unmatched queries
    return {
      message: "I understand you're looking for help. Could you be more specific about what you need assistance with? I can help with leave requests, benefits, payroll, attendance, and more.",
      suggestions: [
        "How do I request time off?",
        "What are my benefits?",
        "How do I check my attendance?",
        "How do I view my payroll?"
      ]
    };
  }

  private static calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  static getWelcomeMessage(): QAIResponse {
    return {
      message: "👋 Hello! I'm Q AI, your intelligent HR assistant. I'm here to help you with any questions about leave, benefits, payroll, attendance, and more. How can I assist you today?",
      suggestions: [
        "How do I request time off?",
        "What are my benefits?",
        "How do I check my attendance?",
        "How do I view my payroll information?"
      ]
    };
  }
}
