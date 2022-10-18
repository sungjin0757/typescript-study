function add(a, b) {
    return a + b;
}
add(10, null);

// const x: number = null;

const x: number | null = null;

const el = document.getElementById('status');
el.textContent = 'Ready';

if(el) {
    el.textContent = 'Ready'; // 정상 null은 제외
}
el!.textContent = 'Ready';