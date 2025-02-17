document.addEventListener('DOMContentLoaded', () => {
    const patternList = document.querySelector('.pattern-list');
    const patternInfo = document.querySelector('.pattern-info');
    const patternDemo = document.querySelector('.pattern-demo');
    const navLinks = document.querySelectorAll('nav a');

    // Add mouse tracking for glow effect
    function handleMouseMove(event) {
        const demo = event.currentTarget;
        const rect = demo.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        demo.style.setProperty('--mouse-x', `${x}%`);
        demo.style.setProperty('--mouse-y', `${y}%`);
    }

    // Pattern categories
    const patterns = {
        creational: [
            { name: 'Singleton', id: 'singleton', category: 'creational', level: 'basic',
              description: 'Ensures a class has only one instance' },
            { name: 'Factory', id: 'factory', category: 'creational', level: 'basic',
              description: 'Creates objects without specifying the exact class' },
            { name: 'Builder', id: 'builder', category: 'creational', level: 'basic',
              description: 'Separates object construction from its representation' },
            { name: 'Prototype', id: 'prototype', category: 'creational', level: 'basic',
              description: 'Creates new objects by cloning an existing object' },
            { name: 'Abstract Factory', id: 'abstractFactory', category: 'creational', level: 'advanced',
              description: 'Creates families of related objects' },
            { name: 'Object Pool', id: 'objectPool', category: 'creational', level: 'advanced',
              description: 'Reuses and manages a pool of objects' }
        ],
        structural: [
            { name: 'Adapter', id: 'adapter', category: 'structural', level: 'basic',
              description: 'Allows incompatible interfaces to work together' },
            { name: 'Decorator', id: 'decorator', category: 'structural', level: 'basic',
              description: 'Adds responsibilities to objects dynamically' },
            { name: 'Facade', id: 'facade', category: 'structural', level: 'basic',
              description: 'Provides a simplified interface to a complex subsystem' },
            { name: 'Composite', id: 'composite', category: 'structural', level: 'basic',
              description: 'Composes objects into tree structures' },
            { name: 'Bridge', id: 'bridge', category: 'structural', level: 'advanced',
              description: 'Separates an abstraction from its implementation' },
            { name: 'Flyweight', id: 'flyweight', category: 'structural', level: 'advanced',
              description: 'Minimizes memory usage by sharing data' },
            { name: 'Proxy', id: 'proxy', category: 'structural', level: 'advanced',
              description: 'Provides a surrogate for another object' }
        ],
        behavioral: [
            { name: 'Observer', id: 'observer', category: 'behavioral', level: 'basic',
              description: 'Defines one-to-many dependency between objects' },
            { name: 'Strategy', id: 'strategy', category: 'behavioral', level: 'basic',
              description: 'Defines a family of interchangeable algorithms' },
            { name: 'Command', id: 'command', category: 'behavioral', level: 'basic',
              description: 'Encapsulates a request as an object' },
            { name: 'State', id: 'state', category: 'behavioral', level: 'basic',
              description: 'Allows an object to alter its behavior' },
            { name: 'Template Method', id: 'template', category: 'behavioral', level: 'advanced',
              description: 'Defines the skeleton of an algorithm' },
            { name: 'Chain of Responsibility', id: 'chain', category: 'behavioral', level: 'advanced',
              description: 'Passes requests along a chain of handlers' },
            { name: 'Mediator', id: 'mediator', category: 'behavioral', level: 'advanced',
              description: 'Defines how objects interact with each other' },
            { name: 'Memento', id: 'memento', category: 'behavioral', level: 'advanced',
              description: 'Captures and restores an object\'s state' }
        ]
    };

    let currentCategory = 'creational';

    // Initialize the pattern list with animations and categories
    function displayPatternList(category) {
        patternList.innerHTML = '';
        
        // Create basic patterns section
        const basicPatterns = patterns[category].filter(p => p.level === 'basic');
        if (basicPatterns.length > 0) {
            const basicSection = document.createElement('div');
            basicSection.className = 'pattern-section';
            basicSection.innerHTML = '<h3 class="section-title">Basic Patterns</h3>';
            patternList.appendChild(basicSection);

            basicPatterns.forEach((pattern, index) => {
                const patternElement = createPatternElement(pattern, index);
                basicSection.appendChild(patternElement);
            });
        }

        // Create advanced patterns section
        const advancedPatterns = patterns[category].filter(p => p.level === 'advanced');
        if (advancedPatterns.length > 0) {
            const advancedSection = document.createElement('div');
            advancedSection.className = 'pattern-section';
            advancedSection.innerHTML = '<h3 class="section-title">Advanced Patterns</h3>';
            patternList.appendChild(advancedSection);

            advancedPatterns.forEach((pattern, index) => {
                const patternElement = createPatternElement(pattern, index + basicPatterns.length);
                advancedSection.appendChild(patternElement);
            });
        }
    }

    function createPatternElement(pattern, index) {
        const patternElement = document.createElement('div');
        patternElement.classList.add('pattern-item');
        patternElement.dataset.id = pattern.id;
        patternElement.dataset.category = pattern.category;
        patternElement.dataset.level = pattern.level;
        patternElement.style.setProperty('--item-index', index);
        
        patternElement.innerHTML = `
            <div class="pattern-item-header">
                <span class="pattern-name">${pattern.name}</span>
                <span class="pattern-level ${pattern.level}">${pattern.level}</span>
            </div>
            <p class="pattern-description">${pattern.description}</p>
        `;
        
        patternElement.addEventListener('click', () => selectPattern(pattern));
        return patternElement;
    }

    // Handle pattern selection with loading state
    function selectPattern(pattern) {
        const previousSelected = document.querySelector('.pattern-item.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }

        const selectedElement = document.querySelector(`[data-id="${pattern.id}"]`);
        if (selectedElement) {
            selectedElement.classList.add('selected');
        }

        // Show loading state
        patternInfo.innerHTML = `
            <h2>${pattern.name} Pattern</h2>
            <p class="pattern-level ${pattern.level}">${pattern.level}</p>
            <p class="loading">Loading ${pattern.name} pattern details and demonstration...</p>
        `;
        
        // Simulate loading for smoother transition
        setTimeout(() => updatePatternDisplay(pattern), 300);
    }

    // Update the pattern display area with fade animation
    function updatePatternDisplay(pattern) {
        patternDemo.style.opacity = '0';
        
        patternInfo.innerHTML = `
            <h2>${pattern.name} Pattern</h2>
            <p>Explore the ${pattern.name} pattern through an interactive demonstration.</p>
        `;
        
        // This will be populated by patterns.js for each specific pattern
        if (window.patternImplementations && window.patternImplementations[pattern.id]) {
            setTimeout(() => {
                window.patternImplementations[pattern.id](patternDemo);
                patternDemo.style.opacity = '1';
                
                // Add mouse tracking to the new demo
                patternDemo.addEventListener('mousemove', handleMouseMove);
            }, 200);
        } else {
            patternDemo.innerHTML = `
                <div class="pattern-example">
                    <h3>${pattern.name} Pattern</h3>
                    <p>This pattern demonstration is coming soon...</p>
                    <div class="demo-controls">
                        <button disabled>Demo Unavailable</button>
                    </div>
                </div>
            `;
            patternDemo.style.opacity = '1';
        }
    }

    // Handle navigation with active state and transitions
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default for category navigation
            if (link.dataset.category) {
                e.preventDefault();
                const category = link.dataset.category;
                
                // Update active state
                navLinks.forEach(l => {
                    l.classList.remove('active');
                    l.style.opacity = '0.5';
                });
                link.classList.add('active');
                link.style.opacity = '1';

                // Fade out current list with scale
                patternList.style.opacity = '0';
                patternList.style.transform = 'scale(0.95)';
                
                // Update after fade
                setTimeout(() => {
                    currentCategory = category;
                    displayPatternList(category);
                    patternList.style.opacity = '1';
                    patternList.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });

    // Initialize with creational patterns
    displayPatternList(currentCategory);

    // Add initial mouse tracking
    patternDemo.addEventListener('mousemove', handleMouseMove);
}); 