import { useState } from 'react';

const inputClass =
    'w-full px-3 py-2.5 border border-slate-300 rounded-md text-sm bg-white ' +
    'focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all';

export default function EmpForm({ editingEmp, departments, onSubmit, onCancel }) {

    // 부서 ID 추출 로직 (수정 모드 대비)
    const initialDeptId = editingEmp?.departmentId ?? editingEmp?.departmentDto?.id;

    // ── 폼 입력 상태 초기화 ──────────────────────────────────────────
    const [firstName, setFirstName] = useState(editingEmp?.firstName ?? '');
    const [lastName, setLastName] = useState(editingEmp?.lastName ?? '');
    const [email, setEmail] = useState(editingEmp?.email ?? '');
    const [departmentId, setDepartmentId] = useState(String(initialDeptId ?? ''));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ firstName, lastName, email, departmentId });
    };

    return (
        <div className="card border border-slate-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-700 border-l-4 border-blue-400 pl-3 mb-5">
                {editingEmp ? '직원 수정' : '직원 등록'}
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="flex gap-4 flex-wrap mb-4">
                    <div className="flex-1 min-w-48">
                        <label className="block mb-1.5 font-semibold text-sm text-slate-500">이름 (First Name)</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            placeholder="예: John"
                            required
                            className={inputClass}
                        />
                    </div>
                    <div className="flex-1 min-w-48">
                        <label className="block mb-1.5 font-semibold text-sm text-slate-500">성 (Last Name)</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            placeholder="예: Doe"
                            required
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="flex gap-4 flex-wrap mb-4">
                    <div className="flex-1 min-w-48">
                        <label className="block mb-1.5 font-semibold text-sm text-slate-500">이메일</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="예: john.doe@example.com"
                            required
                            className={inputClass}
                        />
                    </div>
                    <div className="flex-1 min-w-48">
                        <label className="block mb-1.5 font-semibold text-sm text-slate-500">부서</label>
                        <select
                            value={departmentId}
                            onChange={e => setDepartmentId(e.target.value)}
                            required
                            className={`${inputClass} appearance-none`}
                        >
                            <option value="">부서를 선택하세요...</option>
                            {departments.map(d => (
                                <option key={d.id} value={String(d.id)}>
                                    {d.departmentName} (ID: {d.id})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    {editingEmp ? '수정 저장' : '직원 생성'}
                </button>
                {editingEmp && (
                    <button type="button" onClick={onCancel} className="btn btn-info ml-2">
                        취소
                    </button>
                )}
            </form>
        </div>
    );
}