import axios from "axios";

export const folderword = {
    getUserFolders: async (userId: string) => {
        if (!userId) return [];

        try {
            const res = await axios.get(`/api/folderword?userId=${userId}`);
            return res.data;
        } catch (err: any) {
            if (err.response?.status === 404) {
                console.warn("No folder data found for this user.");
                return [];
            }
            console.error("Failed to fetch folder words", err);
            return [];
        }
    },
};
