import React, { useState } from "react";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Checkbox from "../../../components/form/input/Checkbox";
import Button from "../../../components/ui/button/Button";
import PageMeta from "../../../components/common/PageMeta";
import apiClient from "../../../api/apiClient";
import { useNavigate } from "react-router";

const CreateCategoryPage: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [featured, setFeatured] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async () => {
        const categoryData = {
            name,
            description,
            image,
            featured,
        };
        console.log("Submitted category:", categoryData);
        try {
            const res = await apiClient.post("/categories", categoryData);
            if (res.data.success) {
                navigate("/admin/categories");
            }
        } catch (error) {
            console.log(error);
        }
        // Submit logic goes here
    };

    return (
        <>
            <PageMeta title="Create an category" description="" />
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                    Create an category
                </h2>
            </div>
            <div className="max-w-3xl space-y-6 ">
                <div>
                    <Label className="block text-sm font-medium mb-1">
                        Name
                    </Label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <Label className="block text-sm font-medium mb-1">
                        Description
                    </Label>
                    <TextArea
                        value={description}
                        onChange={(value) => setDescription(value)}
                    />
                </div>
                <div>
                    <Label className="block text-sm font-medium mb-1">
                        Image URL
                    </Label>
                    <Input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="featured"
                        checked={featured}
                        onChange={(checked: boolean) => setFeatured(checked)}
                    />
                    <Label htmlFor="featured" className="text-sm">
                        Featured
                    </Label>
                </div>
                <Button onClick={handleSubmit} className="w-full">
                    Create
                </Button>
            </div>
        </>
    );
};

export default CreateCategoryPage;
