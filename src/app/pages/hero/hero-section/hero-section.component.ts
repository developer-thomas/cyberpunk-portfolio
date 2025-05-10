import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { TypewriterEffectComponent } from '../../../shared/components/typewriter-effect/typewriter-effect.component';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  update(canvas: HTMLCanvasElement, mouse: { x: number; y: number }): void
  draw(ctx: CanvasRenderingContext2D): void
}

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, TypewriterEffectComponent, NgIcon, LucideAngularModule, TranslatePipe],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent implements OnInit, AfterViewInit, OnDestroy{
  @Output() explore = new EventEmitter<void>()
  @ViewChild("canvas") canvasRef!: ElementRef<HTMLCanvasElement>

  isLoaded = false
  activeIcon = 0
  particles: Particle[] = []
  mouse = { x: 0, y: 0 }
  animationId?: number

  icons = [
    { icon: 'lucideCode', label: "Development" },
    { icon: 'lucideLayers', label: "Web" },
    { icon: 'lucideDatabase', label: "Design" },
    { icon: 'lucideGlobe', label: "Quality" },
    { icon: 'lucideShield', label: "Security" },
  ]

  typewriterWords = [
    { text: "FRONT-END" },
    { text: "BACK-END" },
    { text: "FULL-STACK" },
    { text: "DESENVOLVIMENTO" },
    { text: "CREATIVE" },
    { text: "CODER" },
  ]

  constructor() {}

  ngOnInit(): void {
    // Simulate loading
    setTimeout(() => {
      this.isLoaded = true
    }, 500)

    // Cycle through icons
    setInterval(() => {
      this.activeIcon = (this.activeIcon + 1) % 5
    }, 3000)
  }

  ngAfterViewInit(): void {
    this.initCanvas()

    // Handle mouse movement
    window.addEventListener("mousemove", this.handleMouseMove.bind(this))
    window.addEventListener("resize", this.handleResize.bind(this))

    // Start animation
    this.animate()
  }

  ngOnDestroy(): void {
    window.removeEventListener("mousemove", this.handleMouseMove.bind(this))
    window.removeEventListener("resize", this.handleResize.bind(this))

    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  }

  handleMouseMove(e: MouseEvent): void {
    this.mouse = { x: e.clientX, y: e.clientY }
  }

  handleResize(): void {
    const canvas = this.canvasRef.nativeElement
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Recreate particles on resize
    this.particles = []
    this.initParticles()
  }

  initCanvas(): void {
    const canvas = this.canvasRef.nativeElement
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    this.initParticles()
  }

  initParticles(): void {
    const canvas = this.canvasRef.nativeElement

    for (let i = 0; i < 150; i++) {
      this.particles.push(this.createParticle(canvas))
    }
  }

  createParticle(canvas: HTMLCanvasElement): Particle {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      color: Math.random() > 0.5 ? "#0891b2" : "#db2777", // cyan-600 or pink-600

      update(canvas: HTMLCanvasElement, mouse: { x: number; y: number }): void {
        // Move particles
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        // Mouse interaction - particles move away from mouse
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 80) {
          const angle = Math.atan2(dy, dx)
          const force = (80 - distance) / 80
          this.x += Math.cos(angle) * force
          this.y += Math.sin(angle) * force
        }
      },

      draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      },
    }
  }

  animate(): void {
    const canvas = this.canvasRef.nativeElement
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.particles.forEach((particle) => {
      particle.update(canvas, this.mouse)
      particle.draw(ctx)
    })

    // Draw connections between particles
    ctx.strokeStyle = "rgba(8, 145, 178, 0.05)" // cyan with low opacity
    ctx.lineWidth = 0.5

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x
        const dy = this.particles[i].y - this.particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(this.particles[i].x, this.particles[i].y)
          ctx.lineTo(this.particles[j].x, this.particles[j].y)
          ctx.stroke()
        }
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate())
  }

  onExplore(): void {
    this.explore.emit()
  }
}
