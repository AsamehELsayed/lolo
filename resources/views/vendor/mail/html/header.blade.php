@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'LOLO' || trim($slot) === 'Laravel')
<img src="{{ config('app.url') }}/assets/logo.jpeg" class="logo" alt="{{ config('app.name') }}" style="height: 64px; width: 64px; border-radius: 50%;">
<div style="margin-top: 10px; font-size: 24px; font-weight: bold; color: #5B0F17; letter-spacing: 0.2em;">LOLO</div>
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
