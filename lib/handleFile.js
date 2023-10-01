export function handleFile(setUpdateContent, updateContent, setFileName) {
    const handleFileChange = (e) => {
        const fileInput = e.target;
        const file = fileInput.files[0];
        fileInput.value = '';

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                // 使用 canvas 进行图片压缩
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // 设定 canvas 的宽和高
                const MAX_WIDTH = 800;  // 你可以设置为其他值
                const MAX_HEIGHT = 800; // 你可以设置为其他值
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // 将压缩后的图片转换为 data URL
                const base64 = canvas.toDataURL('image/jpeg', 0.8); // 0.8 是 JPEG 的质量设置
                setUpdateContent({...updateContent, banner: base64});
                setFileName(file.name); // 更新文件名称
            };
        };
        reader.readAsDataURL(file);
    };

    const handleButtonClick = () => {
        document.getElementById("fileInput").click(); // 触发文件选择操作
    };
    return {handleFileChange, handleButtonClick};
}