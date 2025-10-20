import React from "react";
import { cn } from "@/lib/utils";

interface ProgramSelectorProps {
    programs: { id: string; name: string; description: string }[];
    selectedProgram: string;
    onSelect: (programId: string) => void;
}

const ProgramSelector: React.FC<ProgramSelectorProps> = ({ programs, selectedProgram, onSelect }) => {
    return (
        <div className="flex flex-col justify-center w-full gap-4 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="font-bold text-5xl uppercase align-middle items-center">
                    Web Kriptografi <br /> Toolkit
                </h1>
                <span className="w-[900px] text-lg font-normal align-middle items-center">
                    Aplikasi kriptografi berbasis web untuk enkripsi / dekripsi teks & file. Menampilkan Base64, mendukung cipher 26 huruf dan Extended (256 byte), serta penyimpanan cipher binary.
                </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {programs.map((program) => (
                    <div
                        key={program.id}
                        onClick={() => onSelect(program.id)}
                        className={cn(
                            "cursor-pointer rounded-lg border p-4 shadow-md transition-colors",
                            selectedProgram === program.id
                                ? "bg-primary text-white dark:text-black"
                                : "bg-white text-black hover:bg-gray-100 dark:bg-white/5 dark:text-muted-foreground dark:hover:bg-primary/10" // Warna untuk mode light dan dark
                        )}
                    >
                        <h2 className="text-xl font-semibold">{program.name}</h2>
                        <p className="text-sm">
                            {selectedProgram === program.id
                                ? `Dipilih: ${program.description}`
                                : program.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgramSelector;