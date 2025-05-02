// ==================== TaskList 子組件 ====================
// 這是一個負責顯示任務列表的子組件
// 使用解構賦值 { tasks } 從 props 中提取 tasks 陣列
// 這是 React 組件間傳遞數據的標準方式
// 參考文件：https://react.dev/learn/passing-props-to-a-component
export default function TaskList({ tasks }) {
    // ========== 渲染 UI ==========
    // 返回一個無序列表來顯示所有任務
    return (
        // ul 元素作為任務列表的容器
        // space-y-2：使用 Tailwind CSS 在列表項之間添加間距
        // 參考文件：https://tailwindcss.com/docs/space
        <ul className="space-y-2">
            {/* 使用 map 方法遍歷 tasks 陣列
                對每個任務創建一個列表項
                這是 React 中渲染列表的標準方式
                參考文件：https://react.dev/learn/rendering-lists */}
            {tasks.map((task, index) => (
                // 列表項容器
                <li
                    // key 屬性是 React 用來追踪列表項的特殊屬性
                    // 它幫助 React 確定哪些項需要更新、添加或刪除
                    // 在實際應用中最好使用唯一的 ID 而不是索引
                    // 參考文件：https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
                    key={index}
                    // 使用 Tailwind CSS 設置樣式
                    // border：添加邊框
                    // p-2：設置內邊距
                    // rounded：設置圓角
                    className="border p-2 rounded"
                >
                    {/* 顯示任務文本 */}
                    {/* 這裡的 task 是當前遍歷的任務字符串 */}
                    {task}
                </li>
            ))}
        </ul>
    )
}