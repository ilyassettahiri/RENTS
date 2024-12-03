@props(['url'])
<tr>
<td class="header">
<a href="https://rents.ma/" style="display: inline-block;">
@if (trim($slot) === 'RENTS.ma')
<img src="https://rents.fra1.cdn.digitaloceanspaces.com/storage/rents-ma.png" class="logo" alt="RENTS.ma Logo">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
