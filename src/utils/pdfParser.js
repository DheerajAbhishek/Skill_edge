import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const parsePDF = async (file) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let fullText = '';
        const numPages = pdf.numPages;

        // Extract text from all pages
        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }

        return {
            text: fullText,
            numPages: numPages
        };
    } catch (error) {
        console.error('PDF parsing error:', error);
        throw new Error('Failed to parse PDF. Please ensure it\'s a valid text-based PDF.');
    }
};

export const extractBasicInfo = (text) => {
    const info = {
        name: null,
        email: null,
        phone: null
    };

    // Extract email
    const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) {
        info.email = emailMatch[0];
    }

    // Extract phone
    const phoneMatch = text.match(/[\+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}/);
    if (phoneMatch) {
        info.phone = phoneMatch[0];
    }

    // Extract name using email hint
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const skipWords = ['resume', 'cv', 'curriculum', 'vitae', 'profile', 'summary', 'objective', 'contact', 'email', 'phone', 'address', 'linkedin', 'github', 'portfolio', 'website'];

    // If we have an email, try to extract name components from it
    let emailNameParts = [];
    let emailUsername = '';
    if (info.email) {
        emailUsername = info.email.split('@')[0];

        // Try multiple strategies to extract name parts
        let parts = [];

        // Strategy 1: Split by common separators (., _, -, and numbers)
        const separatorParts = emailUsername
            .split(/[._\-\d]+/)
            .filter(part => part.length > 2);

        // Strategy 2: Split by capital letters (camelCase like johnDoe)
        const camelParts = emailUsername
            .split(/(?=[A-Z])/)
            .filter(part => part.length > 2)
            .map(part => part.toLowerCase());

        // Combine both strategies
        parts = [...new Set([...separatorParts, ...camelParts])].map(p => p.toLowerCase());

        // If we still don't have parts, try to extract first chunk as potential first name
        if (parts.length === 0 && emailUsername.length > 0) {
            // Remove numbers and take first meaningful chunk
            const cleaned = emailUsername.replace(/\d+/g, '');
            if (cleaned.length >= 4) {
                // Try to find a common first name length (4-10 chars typically)
                const potentialName = cleaned.substring(0, Math.min(cleaned.length, 10));
                parts = [potentialName.toLowerCase()];
            }
        }

        emailNameParts = parts.filter(p => p.length > 2);
    }

    // First, try to find name using email hints
    if (emailNameParts.length > 0) {
        for (const line of lines.slice(0, 20)) {
            if (!line || line.length > 60 || line.length < 2) continue;

            const lowerLine = line.toLowerCase();
            const hasSkipWord = skipWords.some(word => lowerLine.includes(word));
            const hasEmail = /@/.test(line);
            const hasUrl = /https?:\/\/|www\./i.test(line);
            const hasLotsOfNumbers = (line.match(/\d/g) || []).length > 3;

            if (!hasSkipWord && !hasEmail && !hasUrl && !hasLotsOfNumbers) {
                // Check if this line contains any of the email name parts
                const matchingParts = emailNameParts.filter(part =>
                    lowerLine.includes(part) && part.length > 2
                );

                // If we find ANY match, it's likely the name
                if (matchingParts.length > 0) {
                    const words = line.split(/\s+/);
                    if (words.length >= 1 && words.length <= 5) {
                        // Validate it looks like a name
                        const hasOnlyLettersAndSpaces = /^[a-zA-Z\s]+$/.test(line);
                        if (hasOnlyLettersAndSpaces) {
                            info.name = line;
                            break;
                        }
                    }
                }
            }
        }
    }

    // Fallback 1: Traditional method if email hint didn't work
    if (!info.name) {
        for (const line of lines.slice(0, 10)) {
            if (!line || line.length > 50 || line.length < 2) continue;

            const lowerLine = line.toLowerCase();
            const hasSkipWord = skipWords.some(word => lowerLine.includes(word));
            const hasEmail = /@/.test(line);
            const hasUrl = /https?:\/\/|www\./i.test(line);
            const isAllCaps = line === line.toUpperCase() && line.length > 10;
            const hasNumbers = /\d{3,}/.test(line);
            const hasOnlyLettersAndSpaces = /^[a-zA-Z\s]+$/.test(line);

            if (!hasSkipWord && !hasEmail && !hasUrl && !isAllCaps && !hasNumbers && hasOnlyLettersAndSpaces) {
                const words = line.split(/\s+/);
                if (words.length >= 1 && words.length <= 4) {
                    info.name = line;
                    break;
                }
            }
        }
    }

    // Fallback 2: Use email username as name (format it nicely)
    if (!info.name && emailUsername) {
        // Remove numbers and format the username
        const cleanedUsername = emailUsername.replace(/\d+/g, '');
        if (cleanedUsername.length >= 3) {
            // Capitalize first letter
            const formattedName = cleanedUsername.charAt(0).toUpperCase() + cleanedUsername.slice(1);
            info.name = formattedName;
        }
    }

    return info;
};
