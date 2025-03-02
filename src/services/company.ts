import { PrismaClient, Company, Prisma } from "@prisma/client";
import error from "../utils/error";

const prisma = new PrismaClient();

export class CompanyService {
    
    /**
     * Create a new company
     */
    async create(data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) {
        // First check if email already exists
        const existingCompany = await prisma.company.findUnique({
            where: { email: data.email },
            select: { id: true } // Only select ID for efficiency
        });

        if (existingCompany) {
            throw error(`Company with email '${data.email}' already exists`, 409);
        }
        
        // If no existing company found, proceed with creation
        return await prisma.company.create({ data });
    }  

    /**
     * Find all companies
     */
    async findAll() {
        const companies = await prisma.company.findMany();

        if (companies.length === 0) {
            throw error('No companies found', 404);
        }

        return companies;
    }

    /**
     * Find a company by ID
     */
    async findOne(id: string) {
        const company = await this.findCompanyById(id);
        return company;
    }
    
    /**
     * Update a company
     */
    async update(id: string, data: Partial<Omit<Company, 'id' | 'createdAt' | 'updatedAt'>>) {
        // Ensure company exists
        await this.findCompanyById(id);
        
        // Update the company
        return await prisma.company.update({
            where: { id },
            data
        });
    }

    /**
     * Delete a company
     */
    async delete(id: string) {
        // Ensure company exists
        await this.findCompanyById(id);
        
        // Delete the company
        return await prisma.company.delete({
            where: { id }
        });
    }

    /**
     * Helper method to find a company by ID and throw error if not found
     * @private
     */
    private async findCompanyById(id: string): Promise<Company> {
        const company = await prisma.company.findUnique({
            where: { id }
        });

        if (!company) {
            throw error(`Company with ID ${id} not found`, 404);
        }

        return company;
    }
}
