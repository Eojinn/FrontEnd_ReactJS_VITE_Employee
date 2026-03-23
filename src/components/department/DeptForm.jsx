import { useState } from 'react'; // useEffect가 필요 없어졌습니다!

const inputClass =
    'w-full px-3 py-2.5 border border-slate-300 rounded-md text-sm bg-white ' +
    'focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all';

export default function DeptForm({ editingDept, onSubmit, onCancel }) {

    // ── 폼 입력 상태 ──────────────────────────────────────────────────
    // 부모가 전달한 key가 바뀌면 이 컴포넌트가 새로 생성되면서 
    // 아래 useState의 초기값들이 자동으로 새 데이터로 채워집니다.
    const [name, setName] = useState(editingDept?.departmentName ?? ''); 
    const [desc, setDesc] = useState(editingDept?.departmentDescription ?? '');

    // ── 폼 제출 처리 ─────────────────────────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            departmentName: name.trim(),
            departmentDescription: desc.trim(),
        });
    };

    return (
        <div className="card border border-slate-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-700 border-l-4 border-blue-400 pl-3 mb-5">
                {editingDept ? '부서 수정' : '부서 등록'}
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="flex gap-4 flex-wrap mb-4">
                    <div className="flex-1 min-w-48">
                        <label className="block mb-1.5 font-semibold text-sm text-slate-500">부서명</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="예: HR"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div className="flex-1 min-w-48">
                        <label className="block mb-1.5 font-semibold text-sm text-slate-500">부서 설명</label>
                        <input
                            type="text"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            placeholder="부서에 대한 설명을 입력하세요"
                            required
                            className={inputClass}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    {editingDept ? '수정 저장' : '부서 생성'}
                </button>

                {editingDept && (
                    <button type="button" onClick={onCancel} className="btn btn-info ml-2">
                        취소
                    </button>
                )}
            </form>
        </div>
    );
}