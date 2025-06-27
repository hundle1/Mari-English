export const vocabulary = {
    getVocabularyWords: async () => {
        try {
            const res = await fetch("/api/vocabulary", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Nếu server trả về 404 (không tìm thấy route), mới coi là lỗi
            if (res.status === 404) {
                console.error("API route /api/vocabulary not found");
                return [];
            }

            if (!res.ok) {
                console.warn("No vocabulary words found or server responded with non-ok status");
                return [];
            }

            return await res.json();
        } catch (error) {
            console.error("API Error:", error);
            return [];
        }
    },
};
